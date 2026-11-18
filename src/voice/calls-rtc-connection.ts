import { EventEmitter } from "events";
import type WebSocket from "ws";
import { CallError } from "../core/errors";
import { GreenApiLogger } from "../core/logger";
import { CallsRtcClientFrame, CallsRtcServerFrame } from "../types/types";
import {
	CALL_ERROR_MATCHERS,
	CALL_ERROR_MESSAGES,
	CALLS_RTC_CLOSE_NORMAL,
	CALLS_RTC_PERMANENT_CLOSE_CODES,
	CALLS_RTC_RECONNECT_DELAYS_MS,
	CALLS_RTC_REFUSED_HTTP_STATUSES,
} from "../defaults";
import { loadWs } from "./optional-dependencies";

export function isPermanentCallsRtcClose(code: number): boolean {
	return code >= CALLS_RTC_PERMANENT_CLOSE_CODES.min && code <= CALLS_RTC_PERMANENT_CLOSE_CODES.max;
}

export function callsRtcRefusal(reason: string): CallError {
	return reason.toLowerCase().includes(CALL_ERROR_MATCHERS.notInTariff)
		? new CallError("NOT_IN_TARIFF", CALL_ERROR_MESSAGES.NOT_IN_TARIFF, 403, {reason})
		: new CallError("CALLS_NOT_ENABLED", CALL_ERROR_MESSAGES.CALLS_NOT_ENABLED, 403, {reason});
}

/**
 * Connection to the callsRtc WebSocket of an instance that reconnects after network drops.
 * Emits "frame", "reconnected" and "closed".
 *
 * @category Calls
 */
export class CallsRtcConnection extends EventEmitter {
	private readonly gaLogger = GreenApiLogger.getInstance(CallsRtcConnection.name);
	private socket?: WebSocket;
	private opened = false;
	private closedByUser = false;
	private reconnectDelay: number = CALLS_RTC_RECONNECT_DELAYS_MS.first;
	private reconnectTimer?: NodeJS.Timeout;
	private pendingOpen?: {resolve: () => void; reject: (error: Error) => void};

	/**
	 * Creates the connection.
	 *
	 * @param url - The callsRtc URL from GreenApiClient.getCallsRtcUrl
	 */
	constructor(private readonly url: string) {
		super();
	}

	/**
	 * Opens the connection.
	 *
	 * @returns Promise that resolves when the connection is open
	 * @throws {CallError} If the server refuses calls for the instance or cannot be reached
	 */
	open(): Promise<void> {
		this.closedByUser = false;
		return new Promise((resolve, reject) => {
			this.pendingOpen = {resolve, reject};
			this.connect();
		});
	}

	/**
	 * Sends a frame to the server.
	 *
	 * @param frame - The frame to send
	 * @returns False when the connection is not open
	 */
	send(frame: CallsRtcClientFrame): boolean {
		const WebSocketClass = loadWs();
		if (!this.socket || this.socket.readyState !== WebSocketClass.OPEN) {
			return false;
		}
		this.socket.send(JSON.stringify(frame));
		return true;
	}

	/**
	 * Closes the connection.
	 */
	close(): void {
		this.closedByUser = true;
		clearTimeout(this.reconnectTimer);
		const socket = this.socket;
		this.socket = undefined;
		socket?.close(CALLS_RTC_CLOSE_NORMAL);
		this.pendingOpen?.reject(new CallError("CALL_ENDED", CALL_ERROR_MESSAGES.CALL_ENDED));
		this.pendingOpen = undefined;
	}

	private connect(): void {
		const WebSocketClass = loadWs();
		const socket = new WebSocketClass(this.url);
		this.socket = socket;

		socket.on("open", () => {
			const reconnected = this.opened;
			this.opened = true;
			this.reconnectDelay = CALLS_RTC_RECONNECT_DELAYS_MS.first;
			this.pendingOpen?.resolve();
			this.pendingOpen = undefined;
			if (reconnected) {
				this.emit("reconnected");
			}
		});

		socket.on("message", (data) => {
			let frame: CallsRtcServerFrame;
			try {
				frame = JSON.parse(data.toString());
			} catch {
				this.gaLogger.warn("Skipping a callsRtc frame that is not JSON");
				return;
			}
			this.emit("frame", frame);
		});

		let refusedStatus: number | undefined;
		socket.on("unexpected-response", (request, response) => {
			refusedStatus = response.statusCode;
			this.gaLogger.warn("callsRtc connection refused", {status: refusedStatus});
			response.resume();
			socket.terminate();
		});

		socket.on("error", (error) => {
			if (refusedStatus === undefined) {
				this.gaLogger.warn("callsRtc connection error", {error: error.message});
			}
		});

		socket.on("close", (code, reasonBuffer) => {
			if (this.socket !== socket) {
				return;
			}
			this.socket = undefined;
			if (this.closedByUser) {
				return;
			}
			if (refusedStatus !== undefined && CALLS_RTC_REFUSED_HTTP_STATUSES.includes(refusedStatus)) {
				this.fail(new CallError("CALLS_NOT_ENABLED", CALL_ERROR_MESSAGES.CALLS_NOT_ENABLED, 403, {status: refusedStatus}));
				return;
			}
			const reason = reasonBuffer.toString();
			if (isPermanentCallsRtcClose(code)) {
				this.fail(callsRtcRefusal(reason));
				return;
			}
			if (this.pendingOpen) {
				this.fail(new CallError("CALL_FAILED", `Could not connect to the calls server (code ${code})`, 502, {code, reason}));
				return;
			}
			this.gaLogger.warn("callsRtc connection lost, reconnecting", {code, reason});
			this.reconnectTimer = setTimeout(() => this.connect(), this.reconnectDelay);
			this.reconnectDelay = Math.min(this.reconnectDelay * 2, CALLS_RTC_RECONNECT_DELAYS_MS.max);
		});
	}

	private fail(error: CallError): void {
		if (this.pendingOpen) {
			this.pendingOpen.reject(error);
			this.pendingOpen = undefined;
			return;
		}
		this.emit("closed", error);
	}
}
