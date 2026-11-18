import { setTimeout as sleep } from "timers/promises";
import type * as Werift from "werift";
import { CallsRtcClientFrame, IceServer } from "../types/types";
import { CallError } from "../core/errors";
import { CALL_VOICE_GATHER_WAIT_MS, CALL_VOICE_OPUS } from "../defaults";
import { loadWerift } from "./optional-dependencies";

type Candidate = {candidate: string; sdpMid?: string | null; sdpMLineIndex?: number | null};

export class AudioLeg {
	readonly connected: Promise<void>;
	private readonly peer: Werift.RTCPeerConnection;
	private readonly track: Werift.MediaStreamTrack;
	private remoteDescriptionSet = false;
	private pendingCandidates: Candidate[] = [];
	private earlyCandidates: Candidate[] = [];
	private offerSent = false;
	private settleConnected?: {resolve: () => void; reject: (error: Error) => void};

	constructor(iceServers: IceServer[], private readonly send: (frame: CallsRtcClientFrame) => void, onAudio: (opus: Buffer, sequenceNumber: number, timestamp: number) => void) {
		const werift = loadWerift();
		this.connected = new Promise((resolve, reject) => {
			this.settleConnected = {resolve, reject};
		});
		this.connected.catch(() => undefined);

		this.peer = new werift.RTCPeerConnection({
			iceServers,
			codecs: {audio: [new werift.RTCRtpCodecParameters({...CALL_VOICE_OPUS})]},
		});
		this.track = new werift.MediaStreamTrack({kind: "audio"});
		const transceiver = this.peer.addTransceiver(this.track, {direction: "sendrecv"});
		transceiver.onTrack.subscribe((remote) => {
			remote.onReceiveRtp.subscribe((rtp) => onAudio(rtp.payload, rtp.header.sequenceNumber, rtp.header.timestamp));
		});
		this.peer.onIceCandidate.subscribe((candidate) => {
			if (!candidate) {
				return;
			}
			if (this.offerSent) {
				this.send({type: "ice-candidate", candidate: candidate.toJSON()});
			} else {
				this.earlyCandidates.push(candidate.toJSON());
			}
		});
		this.peer.connectionStateChange.subscribe((state) => {
			if (state === "connected") {
				this.settleConnected?.resolve();
				this.settleConnected = undefined;
			} else if (state === "failed" || state === "closed") {
				this.settleConnected?.reject(new CallError("CALL_FAILED", "The audio connection could not be established", 502));
				this.settleConnected = undefined;
			}
		});
	}

	async start(): Promise<void> {
		const offer = await this.peer.createOffer();
		let localError: unknown;
		const localSet = this.peer.setLocalDescription(offer).then(() => undefined, (error) => {
			localError = error;
		});
		await Promise.race([localSet, sleep(CALL_VOICE_GATHER_WAIT_MS)]);
		if (localError) {
			throw localError;
		}
		const sdp = this.peer.localDescription?.sdp ?? offer.sdp;
		this.send({type: "offer", offer: {type: "offer", sdp}});
		this.offerSent = true;
		const offered = new Set(sdp.split(/\r?\n/).filter((line) => line.startsWith("a=candidate:")).map((line) => line.slice(2)));
		const early = this.earlyCandidates;
		this.earlyCandidates = [];
		early.filter((candidate) => !offered.has(candidate.candidate)).forEach((candidate) => this.send({type: "ice-candidate", candidate}));
	}

	async setAnswer(sdp: string): Promise<void> {
		await this.peer.setRemoteDescription({type: "answer", sdp});
		this.remoteDescriptionSet = true;
		const candidates = this.pendingCandidates;
		this.pendingCandidates = [];
		for (const candidate of candidates) {
			await this.peer.addIceCandidate(candidate);
		}
	}

	async addCandidate(candidate: Candidate): Promise<void> {
		if (!this.remoteDescriptionSet) {
			this.pendingCandidates.push(candidate);
			return;
		}
		await this.peer.addIceCandidate(candidate);
	}

	startSource(header: Pick<Werift.RtpHeader, "sequenceNumber" | "timestamp">): void {
		this.track.notifySourceChanged(header);
	}

	writeRtp(packet: Werift.RtpPacket): void {
		this.track.writeRtp(packet);
	}

	close(): void {
		this.settleConnected?.reject(new CallError("CALL_ENDED", "The call ended before the audio connected", 409));
		this.settleConnected = undefined;
		void this.peer.close().catch(() => undefined);
	}
}
