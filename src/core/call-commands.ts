import { CallCommand, CallErrorCode, CallIdResponse } from "../types/types";
import { CALL_ERROR_MATCHERS, CALL_ERROR_MESSAGES } from "../defaults";
import { GreenApiClient } from "./green-api.client";
import { CallError, IntegrationError } from "./errors";

function responseMessage(error: IntegrationError): string {
	const details = error.details as {message?: unknown} | string | undefined;
	if (typeof details === "string") {
		return details;
	}
	if (details && typeof details.message === "string") {
		return details.message;
	}
	return error.message;
}

function callErrorCode(statusCode: number, message: string): CallErrorCode {
	const text = message.toLowerCase();
	switch (statusCode) {
		case 400:
			return "INVALID_CHAT_ID";
		case 403:
			if (text.includes(CALL_ERROR_MATCHERS.noRecentContact)) {
				return "NO_RECENT_CONTACT";
			}
			if (text.includes(CALL_ERROR_MATCHERS.notInTariff)) {
				return "NOT_IN_TARIFF";
			}
			return "CALLS_NOT_ENABLED";
		case 404:
			return "INSTANCE_NOT_FOUND";
		case 409:
			if (text.includes(CALL_ERROR_MATCHERS.alreadyInCall)) {
				return "ALREADY_IN_CALL";
			}
			if (text.includes(CALL_ERROR_MATCHERS.noIncomingCall)) {
				return "NO_INCOMING_CALL";
			}
			if (text.includes(CALL_ERROR_MATCHERS.noActiveCall)) {
				return "NO_ACTIVE_CALL";
			}
			if (text.includes(CALL_ERROR_MATCHERS.notInitialized)) {
				return "INSTANCE_NOT_READY";
			}
			return "CALL_ENDED";
		case 503:
			return "CALL_REFUSED";
		case 504:
			return "TIMEOUT";
		default:
			return "CALL_FAILED";
	}
}

/**
 * Converts an error from a calls method into a CallError.
 *
 * @category Calls
 * @param error - Error thrown by a GreenApiClient calls method
 * @returns The call error
 */
export function toCallError(error: unknown): CallError {
	if (error instanceof CallError) {
		return error;
	}
	if (!(error instanceof IntegrationError) || error.code !== "INTEGRATION_ERROR") {
		const message = error instanceof Error ? error.message : String(error);
		return new CallError("CALL_FAILED", `${CALL_ERROR_MESSAGES.CALL_FAILED}: ${message}`, 500, {originalError: error});
	}
	const message = responseMessage(error);
	const code = callErrorCode(error.statusCode, message);
	return new CallError(code, CALL_ERROR_MESSAGES[code], error.statusCode, error.details ?? {message});
}

/**
 * Runs a call command through GREEN-API.
 *
 * @category Calls
 * @param client - GREEN-API client of the instance
 * @param command - The call command
 * @returns Promise resolving to the call ID
 * @throws {CallError} If GREEN-API refuses the command
 */
export async function runCallCommand(client: GreenApiClient, command: CallCommand): Promise<CallIdResponse> {
	try {
		switch (command.action) {
			case "dial":
				return await client.callsDial({chatId: command.chatId});
			case "accept":
				return await client.callsAccept();
			case "reject":
				return await client.callsReject();
			case "hangUp":
				return await client.callsHangUp();
		}
	} catch (error) {
		throw toCallError(error);
	}
}
