import { IncomingGreenApiWebhook, Message } from "../types/types";

export abstract class MessageTransformer<TPlatformWebhook, TPlatformMessage> {
	abstract toPlatformMessage(webhook: IncomingGreenApiWebhook): TPlatformMessage;
	abstract toGreenApiMessage(message: TPlatformWebhook): Message;
}
