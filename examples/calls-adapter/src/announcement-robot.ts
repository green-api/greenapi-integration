import { CallVoice, formatPhoneNumber, Instance } from "@green-api/greenapi-integration";
import { SampleCallsAdapter } from "./sample-calls-adapter";
import { SampleService } from "./sample-service";

export class AnnouncementRobot {
	constructor(
		private readonly adapter: SampleCallsAdapter,
		private readonly instance: Instance,
		private readonly service: SampleService,
		private readonly file: string,
		private readonly ffmpegPath: string,
	) {}

	async call(phone: string): Promise<string> {
		const voice = this.adapter.createCallVoice(this.instance, {ffmpegPath: this.ffmpegPath});
		try {
			await voice.open();
			const callId = await voice.dial(formatPhoneNumber(phone));
			void this.announce(voice);
			return callId;
		} catch (error) {
			voice.close();
			throw error;
		}
	}

	private async announce(voice: CallVoice): Promise<void> {
		try {
			await voice.waitFor("on-call");
			this.service.log("call", "Robot: answered, playing the announcement");
			await voice.play(this.file);
			if (voice.state.state !== "idle") {
				await voice.hangUp();
			}
		} catch (error) {
			this.service.log("error", `Robot: ${error instanceof Error ? error.message : String(error)}`);
		} finally {
			voice.close();
		}
	}
}
