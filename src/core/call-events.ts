import { CallEvent, CallEventStatus, CallWebhook, GreenApiWebhook } from "../types/types";
import { CALL_END_REASON_DESCRIPTIONS, CALL_END_STATUSES, CALL_EVENT_DESCRIPTIONS } from "../defaults";

/**
 * Checks whether a GREEN-API webhook is an incomingCall or outgoingCall webhook.
 *
 * @category Calls
 * @param webhook - The webhook from GREEN-API
 * @returns True for call webhooks
 */
export function isCallWebhook(webhook: GreenApiWebhook): webhook is CallWebhook {
	return webhook.typeWebhook === "incomingCall" || webhook.typeWebhook === "outgoingCall";
}

/**
 * Converts a call webhook into a call event.
 *
 * @category Calls
 * @param webhook - The incomingCall or outgoingCall webhook
 * @returns The call event
 */
export function toCallEvent(webhook: CallWebhook): CallEvent {
	const status: CallEventStatus = webhook.status === "hungUp" ? "hangUp" : webhook.status;
	const direction = webhook.typeWebhook === "incomingCall" ? "incoming" : "outgoing";

	return {
		callId: webhook.idMessage,
		idInstance: webhook.instanceData.idInstance,
		direction,
		chatId: webhook.from,
		status,
		ended: (CALL_END_STATUSES as readonly string[]).includes(status),
		description: CALL_EVENT_DESCRIPTIONS[direction][status] ?? status,
		durationSeconds: webhook.duration ?? 0,
		isVideo: webhook.isVideo ?? false,
		byApi: webhook.sendByApi ?? false,
		timestamp: webhook.timestamp,
		webhook,
	};
}

/**
 * Describes why a call ended, from the reason in the call state.
 *
 * @category Calls
 * @param reason - The reason from the idle call state
 * @returns Human-readable reason, or undefined when there is none
 */
export function describeCallEndReason(reason?: string): string | undefined {
	if (!reason) {
		return undefined;
	}
	const [kind, detail] = reason.split(/:(.*)/s);
	const description = CALL_END_REASON_DESCRIPTIONS[reason] ?? CALL_END_REASON_DESCRIPTIONS[kind];
	if (!description) {
		return reason;
	}
	return detail ? `${description}: ${detail}` : description;
}
