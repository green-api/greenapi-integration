import { EventEmitter } from "events";
import { Readable } from "stream";
import { GreenApiClient } from "../core/green-api.client";
import { GreenApiLogger } from "../core/logger";
import { CallError } from "../core/errors";
import { describeCallEndReason } from "../core/call-events";
import { runCallCommand } from "../core/call-commands";
import { CallCommand, CallsRtcServerFrame, CallState, CallStateKind } from "../types/types";
import {
	CALL_ERROR_MESSAGES,
	CALL_VOICE_DEFAULT_PCM_SAMPLE_RATE,
	CALL_VOICE_FFMPEG_PATH,
	CALL_VOICE_PCM_SAMPLE_RATES,
} from "../defaults";
import { CallsRtcConnection } from "./calls-rtc-connection";
import { AudioLeg } from "./audio-leg";
import { AudioPlayer } from "./audio-player";
import { PcmSender } from "./pcm-sender";
import { PcmReceiver } from "./pcm-receiver";

export interface CallVoiceOptions {
	ffmpegPath?: string;
	pcmSampleRate?: number;
}

/**
 * Voice of a call for a program: plays audio files into the call, streams live audio in both directions and receives the other side's audio.
 * Needs the optional dependencies werift and ws, ffmpeg for play, and opusscript for live audio (sendPcm and the "remote-pcm" event).
 * Emits "state" (CallState), "ended" (description, reason), "audio" (Opus frame Buffer), "remote-pcm" (16-bit mono PCM Buffer),
 * "closed" (CallError) and "error" (Error).
 *
 * @category Calls
 *
 * @example
 * ```typescript
 * const voice = new CallVoice(client);
 * await voice.open();
 * await voice.dial("79001234567@c.us");
 * await voice.waitFor("on-call");
 * await voice.play("./alert.ogg");
 * await voice.hangUp();
 * voice.close();
 * ```
 */
export class CallVoice extends EventEmitter {
	private readonly gaLogger = GreenApiLogger.getInstance(CallVoice.name);
	private readonly connection: CallsRtcConnection;
	private currentState: CallState = {state: "idle"};
	private endedState?: CallState;
	private leg?: AudioLeg;
	private player?: AudioPlayer;
	private pcmSender?: PcmSender;
	private pcmReceiver?: PcmReceiver;
	private pcmDecodeFailed = false;
	private readonly pcmSampleRate: number;
	private wantAudio = false;

	/**
	 * Creates the call voice.
	 *
	 * @param client - GREEN-API client of the instance
	 * @param options - Path to ffmpeg and the sample rate of live PCM audio (8000, 12000, 16000, 24000 or 48000, default 24000)
	 * @throws {CallError} If the sample rate is not supported
	 */
	constructor(private readonly client: GreenApiClient, private readonly options: CallVoiceOptions = {}) {
		super();
		this.pcmSampleRate = options.pcmSampleRate ?? CALL_VOICE_DEFAULT_PCM_SAMPLE_RATE;
		if (!CALL_VOICE_PCM_SAMPLE_RATES.includes(this.pcmSampleRate)) {
			throw new CallError("INVALID_AUDIO", CALL_ERROR_MESSAGES.INVALID_AUDIO, 400, {pcmSampleRate: this.pcmSampleRate});
		}
		this.connection = new CallsRtcConnection(client.getCallsRtcUrl());
		this.connection.on("frame", (frame: CallsRtcServerFrame) => this.onFrame(frame));
		this.connection.on("reconnected", () => this.onReconnected());
		this.connection.on("closed", (error: CallError) => this.onClosed(error));
	}

	/**
	 * The latest call state of the instance.
	 */
	get state(): CallState {
		return this.currentState;
	}

	/**
	 * Opens the callsRtc connection.
	 *
	 * @returns Promise resolving to the current call state
	 * @throws {CallError} If calls are not available for the instance
	 */
	async open(): Promise<CallState> {
		const firstState = new Promise<CallState>((resolve) => this.once("state", resolve));
		await this.connection.open();
		return firstState;
	}

	/**
	 * Starts an outgoing call and connects the audio.
	 *
	 * @param chatId - Chat ID of the person to call
	 * @returns Promise resolving to the call ID
	 * @throws {CallError} If GREEN-API refuses the call
	 */
	async dial(chatId: string): Promise<string> {
		return this.startCall({action: "dial", chatId});
	}

	/**
	 * Accepts the incoming call and connects the audio.
	 *
	 * @returns Promise resolving to the call ID
	 * @throws {CallError} If there is no incoming call
	 */
	async accept(): Promise<string> {
		return this.startCall({action: "accept"});
	}

	/**
	 * Rejects the incoming call.
	 *
	 * @returns Promise resolving to the call ID
	 * @throws {CallError} If there is no incoming call
	 */
	async reject(): Promise<string> {
		return (await runCallCommand(this.client, {action: "reject"})).callId;
	}

	/**
	 * Ends the current call.
	 *
	 * @returns Promise resolving to the call ID
	 * @throws {CallError} If there is no active call
	 */
	async hangUp(): Promise<string> {
		return (await runCallCommand(this.client, {action: "hangUp"})).callId;
	}

	/**
	 * Waits until the call reaches a state.
	 *
	 * @param state - The state to wait for
	 * @returns Promise resolving to the call state
	 * @throws {CallError} If the call ends first, with the reason as the message
	 */
	waitFor(state: CallStateKind): Promise<CallState> {
		if (this.currentState.state === state) {
			return Promise.resolve(this.currentState);
		}
		if (state !== "idle" && this.currentState.state === "idle" && this.endedState) {
			return Promise.reject(this.endedError(this.endedState));
		}
		return new Promise((resolve, reject) => {
			const onState = (next: CallState) => {
				if (next.state === state) {
					cleanup();
					resolve(next);
				} else if (next.state === "idle") {
					cleanup();
					reject(this.endedError(next));
				}
			};
			const onClosed = (error: CallError) => {
				cleanup();
				reject(error);
			};
			const cleanup = () => {
				this.off("state", onState);
				this.off("closed", onClosed);
			};
			this.on("state", onState);
			this.on("closed", onClosed);
		});
	}

	/**
	 * Plays audio into the call. A new play stops the previous one.
	 *
	 * @param source - Path or URL of an audio file, or a stream of audio in any format ffmpeg reads
	 * @returns Promise that resolves when the audio has been played or stopped
	 * @throws {CallError} If there is no call with audio
	 */
	async play(source: string | Readable): Promise<void> {
		const leg = this.leg;
		if (!leg) {
			throw new CallError("NO_ACTIVE_CALL", CALL_ERROR_MESSAGES.NO_ACTIVE_CALL, 409);
		}
		await leg.connected;
		this.stopPlaying();
		this.pcmSender?.clear();
		const player = new AudioPlayer(this.options.ffmpegPath ?? CALL_VOICE_FFMPEG_PATH, source, (packet, first) => {
			if (this.leg !== leg) {
				return;
			}
			if (first) {
				leg.startSource(packet.header);
			}
			leg.writeRtp(packet);
		});
		this.player = player;
		try {
			await player.done;
		} finally {
			if (this.player === player) {
				this.player = undefined;
			}
		}
	}

	/**
	 * Stops the audio that is playing.
	 */
	stopPlaying(): void {
		this.player?.stop();
		this.player = undefined;
	}

	/**
	 * Sends live audio into the call: 16-bit little-endian mono PCM at the sample rate from the options, in chunks of any size.
	 * Chunks are queued and sent in real time; audio sent before the call is answered waits until the audio is connected.
	 * Stops audio started with play.
	 *
	 * @param chunk - PCM samples
	 * @throws {CallError} If there is no call with audio
	 */
	sendPcm(chunk: Buffer | Int16Array | Uint8Array): void {
		const leg = this.leg;
		if (!leg) {
			throw new CallError("NO_ACTIVE_CALL", CALL_ERROR_MESSAGES.NO_ACTIVE_CALL, 409);
		}
		this.stopPlaying();
		if (!this.pcmSender) {
			this.pcmSender = new PcmSender(this.pcmSampleRate, leg.connected, (packet, first) => {
				if (this.leg !== leg) {
					return;
				}
				if (first) {
					leg.startSource(packet.header);
				}
				leg.writeRtp(packet);
			});
		}
		this.pcmSender.push(Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength));
	}

	/**
	 * Drops live audio that is queued and not sent yet, and stops audio started with play.
	 */
	clearAudio(): void {
		this.pcmSender?.clear();
		this.stopPlaying();
	}

	/**
	 * Waits until all queued live audio has been sent.
	 *
	 * @returns Promise that resolves when the queue is empty
	 */
	drainAudio(): Promise<void> {
		return this.pcmSender ? this.pcmSender.drain() : Promise.resolve();
	}

	/**
	 * Milliseconds of live audio that are queued and not sent yet.
	 */
	get pendingAudioMs(): number {
		return this.pcmSender?.pendingMs ?? 0;
	}

	/**
	 * Stops the audio and closes the callsRtc connection. The call itself is not ended.
	 */
	close(): void {
		this.wantAudio = false;
		this.stopAudio();
		this.connection.close();
	}

	private async startCall(command: CallCommand): Promise<string> {
		this.endedState = undefined;
		const {callId} = await runCallCommand(this.client, command);
		if (this.endedState) {
			return callId;
		}
		this.wantAudio = true;
		await this.startAudio();
		return callId;
	}

	private async startAudio(): Promise<void> {
		this.stopAudio();
		const iceServers = await this.client.callsGetIceServers();
		if (!this.wantAudio) {
			return;
		}
		const leg = new AudioLeg(
			iceServers,
			(frame) => this.connection.send(frame),
			(opus, sequenceNumber, timestamp) => this.onRemoteAudio(opus, sequenceNumber, timestamp),
		);
		this.leg = leg;
		await leg.start();
	}

	private stopAudio(): void {
		this.stopPlaying();
		this.pcmSender?.stop();
		this.pcmSender = undefined;
		this.pcmReceiver?.close();
		this.pcmReceiver = undefined;
		this.pcmDecodeFailed = false;
		this.leg?.close();
		this.leg = undefined;
	}

	private onRemoteAudio(opus: Buffer, sequenceNumber: number, timestamp: number): void {
		this.emit("audio", opus);
		if (this.listenerCount("remote-pcm") === 0 || this.pcmDecodeFailed) {
			return;
		}
		if (!this.pcmReceiver) {
			try {
				this.pcmReceiver = new PcmReceiver(this.pcmSampleRate);
			} catch (error) {
				this.pcmDecodeFailed = true;
				this.report(error as Error);
				return;
			}
		}
		const pcm = this.pcmReceiver.decode(opus, sequenceNumber, timestamp);
		if (pcm) {
			this.emit("remote-pcm", pcm);
		}
	}

	private onFrame(frame: CallsRtcServerFrame): void {
		switch (frame.type) {
			case "state":
				this.onState(frame.state);
				break;
			case "answer":
				void this.leg?.setAnswer(frame.answer.sdp).catch((error) => this.report(error));
				break;
			case "ice-candidate":
				void this.leg?.addCandidate(frame.candidate).catch((error) => this.report(error));
				break;
			case "error":
				this.report(new CallError("CALL_FAILED", frame.message, 502));
				break;
		}
	}

	private onState(state: CallState): void {
		const previous = this.currentState;
		this.currentState = state;
		if (state.state === "idle" && previous.state !== "idle") {
			this.endedState = state;
			this.wantAudio = false;
			this.stopAudio();
		}
		this.emit("state", state);
		if (state.state === "idle" && previous.state !== "idle") {
			this.emit("ended", describeCallEndReason(state.reason), state.reason);
		}
	}

	private onReconnected(): void {
		if (!this.wantAudio) {
			return;
		}
		void this.startAudio().catch((error) => this.report(error));
	}

	private onClosed(error: CallError): void {
		this.wantAudio = false;
		this.stopAudio();
		this.emit("closed", error);
	}

	private endedError(state: CallState): CallError {
		return new CallError("CALL_ENDED", describeCallEndReason(state.reason) ?? CALL_ERROR_MESSAGES.CALL_ENDED, 409, state);
	}

	private report(error: Error): void {
		this.gaLogger.warn("Call voice error", {error: error.message});
		if (this.listenerCount("error") > 0) {
			this.emit("error", error);
		}
	}
}
