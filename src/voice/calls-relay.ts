import type { IncomingMessage } from "http";
import type { Duplex } from "stream";
import type WebSocket from "ws";
import type { WebSocketServer } from "ws";
import { GreenApiClient } from "../core/green-api.client";
import { GreenApiLogger } from "../core/logger";
import { runCallCommand, toCallError } from "../core/call-commands";
import { CallsRelayCommandFrame, CallsRelayResultFrame, Instance } from "../types/types";
import {
	CALLS_RELAY_ACTIONS,
	CALLS_RELAY_CLOSE_UPSTREAM_LOST,
	CALLS_RELAY_FORWARDED_FRAMES,
	CALLS_RELAY_MAX_FRAME_BYTES,
	CALLS_RELAY_UNAUTHORIZED_RESPONSE,
	CALLS_RTC_CLOSE_NORMAL,
} from "../defaults";
import { isPermanentCallsRtcClose } from "./calls-rtc-connection";
import { loadWs } from "./optional-dependencies";

export interface CallsRelayOptions {
	/**
	 * Finds the instance the browser phone may use, or null to refuse the connection.
	 *
	 * @param request - The WebSocket upgrade request from the browser
	 * @returns Promise resolving to the instance or null
	 */
	authorize(request: IncomingMessage): Promise<Instance | null>;
}

/**
 * Connects the browser phone (CallsPhone) to GREEN-API through your server, so the instance token never reaches the browser.
 * Needs the optional dependency ws.
 *
 * @category Calls
 *
 * @example
 * ```typescript
 * const relay = new CallsRelay({authorize: async (request) => findInstanceBySession(request)});
 * server.on("upgrade", (request, socket, head) => {
 *   if (request.url?.startsWith("/calls-phone")) {
 *     relay.handleUpgrade(request, socket, head);
 *   }
 * });
 * ```
 */
export class CallsRelay {
	private readonly gaLogger = GreenApiLogger.getInstance(CallsRelay.name);
	private server?: WebSocketServer;

	/**
	 * Creates the relay.
	 *
	 * @param options - Authorization of browser connections
	 */
	constructor(private readonly options: CallsRelayOptions) {}

	/**
	 * Handles a WebSocket upgrade request from the browser phone.
	 *
	 * @param request - The upgrade request
	 * @param socket - The network socket of the request
	 * @param head - The first packet of the upgraded stream
	 */
	handleUpgrade(request: IncomingMessage, socket: Duplex, head: Buffer): void {
		void this.upgrade(request, socket, head);
	}

	/**
	 * Closes all browser connections.
	 */
	close(): void {
		this.server?.clients.forEach((browser) => browser.close(CALLS_RTC_CLOSE_NORMAL));
		this.server?.close();
		this.server = undefined;
	}

	private async upgrade(request: IncomingMessage, socket: Duplex, head: Buffer): Promise<void> {
		let instance: Instance | null = null;
		try {
			instance = await this.options.authorize(request);
		} catch (error) {
			this.gaLogger.warn("Calls relay authorization failed", {error: error instanceof Error ? error.message : String(error)});
		}
		if (!instance) {
			socket.end(CALLS_RELAY_UNAUTHORIZED_RESPONSE);
			return;
		}
		const authorized = instance;
		this.webSocketServer().handleUpgrade(request, socket, head, (browser) => this.attach(browser, authorized));
	}

	private webSocketServer(): WebSocketServer {
		if (!this.server) {
			const ws = loadWs();
			this.server = new ws.WebSocketServer({noServer: true, maxPayload: CALLS_RELAY_MAX_FRAME_BYTES});
		}
		return this.server;
	}

	private attach(browser: WebSocket, instance: Instance): void {
		const ws = loadWs();
		const client = new GreenApiClient({
			idInstance: instance.idInstance,
			apiTokenInstance: instance.apiTokenInstance,
			apiUrl: instance.apiUrl,
			mediaUrl: instance.mediaUrl,
		});
		const upstream = new ws(client.getCallsRtcUrl(), {maxPayload: CALLS_RELAY_MAX_FRAME_BYTES});
		const queued: string[] = [];
		const toBrowser = (data: string) => {
			if (browser.readyState === ws.OPEN) {
				browser.send(data);
			}
		};

		this.gaLogger.info("Calls relay browser connected", {idInstance: instance.idInstance});

		upstream.on("open", () => {
			this.gaLogger.info("Calls relay connected to GREEN-API", {idInstance: instance.idInstance});
			queued.splice(0).forEach((data) => upstream.send(data));
		});
		upstream.on("message", (data) => {
			const text = data.toString();
			this.logUpstreamFrame(instance.idInstance, text);
			toBrowser(text);
		});
		upstream.on("error", (error) => {
			this.gaLogger.warn("Calls relay upstream error", {idInstance: instance.idInstance, error: error.message});
		});
		upstream.on("close", (code, reason) => {
			this.gaLogger.info("Calls relay GREEN-API connection closed", {idInstance: instance.idInstance, code, reason: reason.toString()});
			if (browser.readyState === ws.OPEN || browser.readyState === ws.CONNECTING) {
				browser.close(isPermanentCallsRtcClose(code) ? code : CALLS_RELAY_CLOSE_UPSTREAM_LOST, reason.toString());
			}
		});

		browser.on("message", (data) => {
			let frame: {type?: unknown};
			try {
				frame = JSON.parse(data.toString());
			} catch {
				return;
			}
			if (frame.type === "command") {
				const command = frame as CallsRelayCommandFrame;
				void this.runCommand(client, command).then((result) => {
					this.gaLogger.info("Calls relay command", {
						idInstance: instance.idInstance,
						action: command.command?.action,
						callId: "callId" in result ? result.callId : undefined,
						error: "error" in result ? result.error : undefined,
					});
					toBrowser(JSON.stringify(result));
				});
				return;
			}
			if (typeof frame.type !== "string" || !(CALLS_RELAY_FORWARDED_FRAMES as readonly string[]).includes(frame.type)) {
				return;
			}
			const text = JSON.stringify(frame);
			if (upstream.readyState === ws.OPEN) {
				upstream.send(text);
			} else if (upstream.readyState === ws.CONNECTING) {
				queued.push(text);
			} else {
				this.gaLogger.warn("Calls relay dropped a browser frame because the GREEN-API connection is closed", {idInstance: instance.idInstance, type: frame.type});
			}
		});
		browser.on("error", (error) => {
			this.gaLogger.warn("Calls relay browser error", {idInstance: instance.idInstance, error: error.message});
		});
		browser.on("close", (code) => {
			this.gaLogger.info("Calls relay browser closed", {idInstance: instance.idInstance, code});
			if (upstream.readyState === ws.OPEN || upstream.readyState === ws.CONNECTING) {
				upstream.close(CALLS_RTC_CLOSE_NORMAL);
			}
		});
	}

	private logUpstreamFrame(idInstance: number | bigint, text: string): void {
		let frame: {type?: unknown; state?: {state?: string; reason?: string}; message?: string};
		try {
			frame = JSON.parse(text);
		} catch {
			return;
		}
		if (frame.type === "state") {
			this.gaLogger.info("Calls relay call state", {idInstance, state: frame.state?.state, reason: frame.state?.reason});
		} else if (frame.type === "error") {
			this.gaLogger.warn("Calls relay error from GREEN-API", {idInstance, error: frame.message});
		}
	}

	private async runCommand(client: GreenApiClient, frame: CallsRelayCommandFrame): Promise<CallsRelayResultFrame> {
		try {
			const command = frame.command;
			if (!command || !(CALLS_RELAY_ACTIONS as readonly string[]).includes(command.action)) {
				return {type: "result", id: frame.id, error: {code: "CALL_FAILED", message: "Unknown call command"}};
			}
			if (command.action === "iceServers") {
				return {type: "result", id: frame.id, iceServers: await client.callsGetIceServers()};
			}
			const {callId} = await runCallCommand(client, command);
			return {type: "result", id: frame.id, callId};
		} catch (error) {
			const callError = toCallError(error);
			return {type: "result", id: frame.id, error: {code: callError.code, message: callError.message}};
		}
	}
}
