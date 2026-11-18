import type OpusScript from "opusscript";
import {
	CALL_VOICE_MAX_GAP_FILL_MS,
	CALL_VOICE_OPUS,
	CALL_VOICE_PCM_BYTES_PER_SAMPLE,
	CALL_VOICE_SEQUENCE_MODULO,
	CALL_VOICE_TIMESTAMP_MODULO,
} from "../defaults";
import { loadOpus } from "./optional-dependencies";

export class PcmReceiver {
	private readonly decoder: OpusScript;
	private readonly clockPerSample: number;
	private lastSequence?: number;
	private expectedTimestamp?: number;

	constructor(sampleRate: number) {
		const Opus = loadOpus();
		this.decoder = new Opus(sampleRate as 48000, 1);
		this.clockPerSample = CALL_VOICE_OPUS.clockRate / sampleRate;
	}

	decode(opus: Buffer, sequenceNumber: number, timestamp: number): Buffer | undefined {
		if (opus.length === 0) {
			return undefined;
		}
		if (this.lastSequence !== undefined) {
			const delta = (sequenceNumber - this.lastSequence + CALL_VOICE_SEQUENCE_MODULO) % CALL_VOICE_SEQUENCE_MODULO;
			if (delta === 0 || delta > CALL_VOICE_SEQUENCE_MODULO / 2) {
				return undefined;
			}
		}
		this.lastSequence = sequenceNumber;
		let pcm: Buffer;
		try {
			pcm = Buffer.from(this.decoder.decode(opus));
		} catch {
			return undefined;
		}
		const silence = this.silenceBefore(timestamp);
		const samples = pcm.length / CALL_VOICE_PCM_BYTES_PER_SAMPLE;
		this.expectedTimestamp = (timestamp + samples * this.clockPerSample) % CALL_VOICE_TIMESTAMP_MODULO;
		return silence ? Buffer.concat([silence, pcm]) : pcm;
	}

	close(): void {
		this.decoder.delete();
	}

	private silenceBefore(timestamp: number): Buffer | undefined {
		if (this.expectedTimestamp === undefined) {
			return undefined;
		}
		const gap = (timestamp - this.expectedTimestamp + CALL_VOICE_TIMESTAMP_MODULO) % CALL_VOICE_TIMESTAMP_MODULO;
		if (gap === 0 || gap > CALL_VOICE_TIMESTAMP_MODULO / 2) {
			return undefined;
		}
		if (gap / CALL_VOICE_OPUS.clockRate * 1000 > CALL_VOICE_MAX_GAP_FILL_MS) {
			return undefined;
		}
		const samples = Math.round(gap / this.clockPerSample);
		return samples > 0 ? Buffer.alloc(samples * CALL_VOICE_PCM_BYTES_PER_SAMPLE) : undefined;
	}
}
