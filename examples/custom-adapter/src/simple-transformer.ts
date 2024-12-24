import { MessageTransformer, Message, IncomingGreenApiWebhook, formatPhoneNumber } from "greenapi-integration";
import { SimplePlatformMessage, SimplePlatformWebhook } from "./types";

export class SimpleTransformer extends MessageTransformer<SimplePlatformWebhook, SimplePlatformMessage> {
	toPlatformMessage(webhook: IncomingGreenApiWebhook): SimplePlatformMessage {
		if (webhook.messageData.typeMessage !== "extendedTextMessage") {
			throw new Error("Only text messages are supported");
		}

		return {
			to: webhook.senderData.sender,
			content: webhook.messageData.extendedTextMessageData?.text || "",
		};
	}

	toGreenApiMessage(message: SimplePlatformWebhook): Message {
		return {
			type: "text",
			chatId: formatPhoneNumber(message.from),
			message: message.text,
		};
	}
}
