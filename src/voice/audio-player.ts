import { spawn, ChildProcess } from "child_process";
import { createSocket } from "dgram";
import { Readable } from "stream";
import type * as Werift from "werift";
import { IntegrationError } from "../core/errors";
import {
	CALL_VOICE_FFMPEG_INPUT_ARGS,
	CALL_VOICE_FFMPEG_OUTPUT_ARGS,
	CALL_VOICE_LOOPBACK_HOST,
	CALL_VOICE_RTP_PACKET_SIZE,
	CALL_VOICE_STDIN_INPUT,
} from "../defaults";
import { loadWerift } from "./optional-dependencies";

export class AudioPlayer {
	readonly done: Promise<void>;
	private ffmpeg?: ChildProcess;
	private stopped = false;

	constructor(
		private readonly ffmpegPath: string,
		private readonly source: string | Readable,
		private readonly onPacket: (packet: Werift.RtpPacket, first: boolean) => void,
	) {
		this.done = this.run();
	}

	stop(): void {
		this.stopped = true;
		this.ffmpeg?.kill();
	}

	private async run(): Promise<void> {
		const {RtpPacket} = loadWerift();
		const socket = createSocket("udp4");
		await new Promise<void>((resolve, reject) => {
			socket.once("error", reject);
			socket.bind(0, CALL_VOICE_LOOPBACK_HOST, () => {
				socket.off("error", reject);
				resolve();
			});
		});

		let first = true;
		socket.on("message", (data) => {
			let packet: Werift.RtpPacket;
			try {
				packet = RtpPacket.deSerialize(data);
			} catch {
				return;
			}
			this.onPacket(packet, first);
			first = false;
		});

		try {
			if (this.stopped) {
				return;
			}
			await this.runFfmpeg(socket.address().port);
		} finally {
			socket.close();
		}
	}

	private runFfmpeg(port: number): Promise<void> {
		const fromStream = typeof this.source !== "string";
		const args = [
			...CALL_VOICE_FFMPEG_INPUT_ARGS,
			"-i", fromStream ? CALL_VOICE_STDIN_INPUT : this.source as string,
			...CALL_VOICE_FFMPEG_OUTPUT_ARGS,
			`rtp://${CALL_VOICE_LOOPBACK_HOST}:${port}?pkt_size=${CALL_VOICE_RTP_PACKET_SIZE}&localaddr=${CALL_VOICE_LOOPBACK_HOST}`,
		];
		const ffmpeg = spawn(this.ffmpegPath, args, {stdio: [fromStream ? "pipe" : "ignore", "ignore", "pipe"]});
		this.ffmpeg = ffmpeg;

		if (fromStream && ffmpeg.stdin) {
			ffmpeg.stdin.on("error", () => undefined);
			(this.source as Readable).pipe(ffmpeg.stdin);
		}

		let stderr = "";
		ffmpeg.stderr?.on("data", (chunk) => {
			stderr += chunk;
		});

		return new Promise((resolve, reject) => {
			ffmpeg.once("error", (error: NodeJS.ErrnoException) => {
				reject(error.code === "ENOENT"
					? new IntegrationError(`ffmpeg was not found at "${this.ffmpegPath}"`, "MISSING_DEPENDENCY", 500)
					: error);
			});
			ffmpeg.once("close", (code) => {
				if (code === 0 || this.stopped) {
					resolve();
					return;
				}
				reject(new IntegrationError(`ffmpeg could not play the audio: ${stderr.trim() || `exit code ${code}`}`, "AUDIO_ERROR", 500));
			});
		});
	}
}
