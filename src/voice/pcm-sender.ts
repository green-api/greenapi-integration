import { setTimeout as sleep } from "timers/promises";
import { randomInt } from "crypto";
import type * as Werift from "werift";
import type OpusScript from "opusscript";
import {
	CALL_VOICE_FRAME_MS,
	CALL_VOICE_MAX_SEND_LAG_MS,
	CALL_VOICE_OPUS_BITRATE,
	CALL_VOICE_OPUS_PAYLOAD_TYPE,
	CALL_VOICE_OPUS,
	CALL_VOICE_PCM_BYTES_PER_SAMPLE,
	CALL_VOICE_SEQUENCE_MODULO,
	CALL_VOICE_TIMESTAMP_MODULO,
} from "../defaults";
import { loadOpus, loadWerift } from "./optional-dependencies";

export class PcmSender {
	private readonly encoder: OpusScript;
	private readonly samplesPerFrame: number;
	private readonly frameBytes: number;
	private readonly clockPerFrame = CALL_VOICE_OPUS.clockRate * CALL_VOICE_FRAME_MS / 1000;
	private readonly ssrc = randomInt(1, 0x7fffffff);
	private queue: Buffer[] = [];
	private queuedBytes = 0;
	private lastPushAt = 0;
	private lastSentAt = 0;
	private paused = true;
	private sequenceNumber = randomInt(0, CALL_VOICE_SEQUENCE_MODULO);
	private timestamp = randomInt(0, 0x7fffffff);
	private newSource = true;
	private pumping = false;
	private stopped = false;
	private drainWaiters: Array<() => void> = [];

	constructor(
		private readonly sampleRate: number,
		private readonly ready: Promise<void>,
		private readonly onPacket: (packet: Werift.RtpPacket, first: boolean) => void,
	) {
		const Opus = loadOpus();
		this.encoder = new Opus(sampleRate as 48000, 1, Opus.Application.RESTRICTED_LOWDELAY);
		this.encoder.setBitrate(CALL_VOICE_OPUS_BITRATE);
		this.samplesPerFrame = sampleRate * CALL_VOICE_FRAME_MS / 1000;
		this.frameBytes = this.samplesPerFrame * CALL_VOICE_PCM_BYTES_PER_SAMPLE;
	}

	get pendingMs(): number {
		return Math.round(this.queuedBytes / CALL_VOICE_PCM_BYTES_PER_SAMPLE / this.sampleRate * 1000);
	}

	push(chunk: Buffer): void {
		if (this.stopped || chunk.length === 0) {
			return;
		}
		this.queue.push(Buffer.from(chunk));
		this.queuedBytes += chunk.length;
		this.lastPushAt = Date.now();
		if (!this.pumping) {
			void this.pump();
		}
	}

	clear(): void {
		this.queue = [];
		this.queuedBytes = 0;
		this.newSource = true;
		this.resolveDrain();
	}

	drain(): Promise<void> {
		if (this.queuedBytes === 0) {
			return Promise.resolve();
		}
		return new Promise((resolve) => this.drainWaiters.push(resolve));
	}

	stop(): void {
		this.stopped = true;
		this.clear();
		if (!this.pumping) {
			this.encoder.delete();
		}
	}

	private async pump(): Promise<void> {
		this.pumping = true;
		try {
			await this.ready;
			let nextAt = Date.now();
			while (!this.stopped && this.queuedBytes > 0) {
				if (this.queuedBytes < this.frameBytes && Date.now() - this.lastPushAt < CALL_VOICE_FRAME_MS) {
					this.paused = true;
					await sleep(CALL_VOICE_FRAME_MS / 2);
					continue;
				}
				const now = Date.now();
				if (nextAt < now - CALL_VOICE_MAX_SEND_LAG_MS) {
					nextAt = now;
				}
				if (nextAt > now) {
					await sleep(nextAt - now);
				}
				if (this.stopped || this.queuedBytes === 0) {
					break;
				}
				this.sendFrame(this.takeFrame());
				nextAt += CALL_VOICE_FRAME_MS;
			}
		} catch {
			this.clear();
		} finally {
			this.pumping = false;
			this.paused = true;
			if (this.stopped) {
				this.encoder.delete();
			} else {
				this.resolveDrain();
			}
		}
	}

	private takeFrame(): Buffer {
		const frame = Buffer.alloc(this.frameBytes);
		let offset = 0;
		while (offset < this.frameBytes && this.queue.length > 0) {
			const head = this.queue[0];
			const taken = Math.min(head.length, this.frameBytes - offset);
			head.copy(frame, offset, 0, taken);
			offset += taken;
			if (taken === head.length) {
				this.queue.shift();
			} else {
				this.queue[0] = head.subarray(taken);
			}
		}
		this.queuedBytes -= offset;
		return frame;
	}

	private sendFrame(frame: Buffer): void {
		const {RtpHeader, RtpPacket} = loadWerift();
		const now = Date.now();
		const missedFrames = this.paused && this.lastSentAt ? Math.round((now - this.lastSentAt) / CALL_VOICE_FRAME_MS) - 1 : 0;
		const resumed = missedFrames > 0;
		if (resumed) {
			this.timestamp = (this.timestamp + missedFrames * this.clockPerFrame) % CALL_VOICE_TIMESTAMP_MODULO;
		}
		this.paused = false;
		const payload = Buffer.from(this.encoder.encode(frame, this.samplesPerFrame));
		const header = new RtpHeader({
			payloadType: CALL_VOICE_OPUS_PAYLOAD_TYPE,
			sequenceNumber: this.sequenceNumber,
			timestamp: this.timestamp,
			ssrc: this.ssrc,
			marker: this.newSource || resumed,
		});
		this.onPacket(new RtpPacket(header, payload), this.newSource);
		this.newSource = false;
		this.lastSentAt = now;
		this.sequenceNumber = (this.sequenceNumber + 1) % CALL_VOICE_SEQUENCE_MODULO;
		this.timestamp = (this.timestamp + this.clockPerFrame) % CALL_VOICE_TIMESTAMP_MODULO;
	}

	private resolveDrain(): void {
		if (this.queuedBytes > 0) {
			return;
		}
		const waiters = this.drainWaiters;
		this.drainWaiters = [];
		waiters.forEach((resolve) => resolve());
	}
}
