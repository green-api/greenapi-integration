import {
	MessageTransformer,
	Message,
	GreenApiWebhook,
	formatPhoneNumber,
	IntegrationError,
} from "@green-api/greenapi-integration";
import { SimplePlatformMessage, SimplePlatformWebhook } from "./types";

export class SimpleTransformer extends MessageTransformer<SimplePlatformWebhook, SimplePlatformMessage> {
	toPlatformMessage(webhook: GreenApiWebhook): SimplePlatformMessage {
		if (webhook.typeWebhook === "incomingMessageReceived") {
			if (webhook.messageData.typeMessage !== "extendedTextMessage") {
				throw new IntegrationError("Only text messages are supported", "BAD_REQUEST_ERROR", 400);
			}

			return {
				to: webhook.senderData.sender,
				content: webhook.messageData.extendedTextMessageData?.text || "",
			};
		}
		throw new IntegrationError("Only incomingMessageReceived type webhooks are supported", "INTEGRATION_ERROR", 500);
	}

	toGreenApiMessage(message: SimplePlatformWebhook): Message {
		return {
			type: "text",
			chatId: formatPhoneNumber(message.from),
			message: message.text,
		};
	}
}
