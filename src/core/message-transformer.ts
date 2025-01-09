import { GreenApiWebhook, Message } from "../types/types";

/**
 * Abstract class for transforming messages between your platform's format and GREEN-API's format.
 * Implement this class to define how messages are converted between the two systems.
 *
 * @category Transformer
 * @typeParam TPlatformWebhook - Your platform's webhook message type
 * @typeParam TPlatformMessage - Your platform's outgoing message type
 *
 * @example
 * ```typescript
 * class YourTransformer extends MessageTransformer<YourWebhook, YourMessage> {
 *   toPlatformMessage(webhook: GreenApiWebhook): YourMessage {
 *     return {
 *       recipient: webhook.senderData.sender,
 *       content: webhook.messageData.textMessageData?.textMessage || "",
 *     };
 *   }
 *
 *   toGreenApiMessage(message: YourWebhook): Message {
 *     return {
 *       type: "text",
 *       chatId: formatPhoneNumber(message.from),
 *       message: message.content,
 *     };
 *   }
 * }
 * ```
 */
export abstract class MessageTransformer<TPlatformWebhook, TPlatformMessage> {
	/**
	 * Transforms a GREEN-API webhook into your platform's message format.
	 * Implement this method to convert incoming WhatsApp messages to your platform's format.
	 *
	 * @param webhook - The incoming webhook from GREEN-API
	 * @returns Your platform's message format
	 * @throws {Error} If the webhook format is invalid or unsupported
	 */
	abstract toPlatformMessage(webhook: GreenApiWebhook): TPlatformMessage;

	/**
	 * Transforms your platform's message format into GREEN-API's message format.
	 * Implement this method to convert your platform's messages to WhatsApp format.
	 *
	 * @param message - The message in your platform's format
	 * @returns Message formatted for GREEN-API
	 * @throws {Error} If the message format is invalid or unsupported
	 */
	abstract toGreenApiMessage(message: TPlatformWebhook): Message;
}
