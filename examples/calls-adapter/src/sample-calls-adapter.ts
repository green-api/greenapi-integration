import { BaseCallsAdapter, CallCommand, CallEvent, formatPhoneNumber, StorageProvider } from "@green-api/greenapi-integration";
import { SampleService } from "./sample-service";

export interface SampleCallRequest {
	action: "dial" | "accept" | "reject" | "hangUp";
	phone?: string;
}

export class SampleCallsAdapter extends BaseCallsAdapter<SampleCallRequest> {
	constructor(storage: StorageProvider, private readonly service: SampleService) {
		super(storage);
	}

	toCallCommand(request: SampleCallRequest): CallCommand {
		if (request.action === "dial") {
			return {action: "dial", chatId: formatPhoneNumber(request.phone ?? "")};
		}
		return {action: request.action};
	}

	async sendCallEventToPlatform(event: CallEvent): Promise<void> {
		const duration = event.ended && event.durationSeconds > 0 ? ` after ${event.durationSeconds} s` : "";
		this.service.log("call", `${event.direction} ${event.chatId}: ${event.description}${duration}`);
	}
}
