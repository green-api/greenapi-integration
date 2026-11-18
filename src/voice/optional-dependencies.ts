import type * as Werift from "werift";
import type WebSocket from "ws";
import type OpusScript from "opusscript";
import { CallError, IntegrationError } from "../core/errors";
import { CALL_ERROR_MESSAGES } from "../defaults";

function loadOptional<T>(name: string): T {
	try {
		return require(name);
	} catch (error) {
		throw new IntegrationError(`Install the optional dependency "${name}" to use call voice`, "MISSING_DEPENDENCY", 500, {originalError: error});
	}
}

export function loadWerift(): typeof Werift {
	return loadOptional<typeof Werift>("werift");
}

export function loadWs(): typeof WebSocket {
	return loadOptional<typeof WebSocket>("ws");
}

export function loadOpus(): typeof OpusScript {
	try {
		return require("opusscript");
	} catch (error) {
		throw new CallError("MISSING_OPUS_CODEC", CALL_ERROR_MESSAGES.MISSING_OPUS_CODEC, 500, {originalError: error});
	}
}
