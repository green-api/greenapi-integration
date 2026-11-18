import {
	PHONE_ACCEPT_FIRST,
	PHONE_CLOSE_NORMAL,
	PHONE_CLOSED,
	PHONE_JOINABLE_STATES,
	PHONE_NOT_CONNECTED,
	PHONE_NOTHING_TO_JOIN,
	PHONE_PERMANENT_CLOSE_CODES,
	PHONE_RECONNECT_DELAYS_MS,
} from "./defaults.js";

export type PhoneCallStateKind = "idle" | "inc-call" | "out-call" | "on-call";

export interface PhoneCallState {
	state: PhoneCallStateKind;
	info?: {id: string; wid: string; name: string};
	reason?: string;
}

export interface PhoneError {
	code: string;
	message: string;
}

export interface PhoneStats {
	connectionState: RTCPeerConnectionState;
	iceConnectionState: RTCIceConnectionState;
	microphone: string;
	microphoneLevel?: number;
	bytesSent: number;
	packetsSent: number;
	bytesReceived: number;
	packetsReceived: number;
	packetsLost: number;
	remoteLevel?: number;
}

type PhoneCommand =
	| {action: "dial"; chatId: string}
	| {action: "accept"}
	| {action: "reject"}
	| {action: "hangUp"}
	| {action: "iceServers"};

type RelayFrame =
	| {type: "state"; state: PhoneCallState}
	| {type: "answer"; answer: RTCSessionDescriptionInit}
	| {type: "ice-candidate"; candidate: RTCIceCandidateInit}
	| {type: "error"; message: string}
	| {type: "result"; id: number; callId?: string; iceServers?: RTCIceServer[]; error?: PhoneError};

type ResultFrame = Extract<RelayFrame, {type: "result"}>;

/**
 * Browser phone for WhatsApp calls through CallsRelay on your server.
 * Dispatches "state" (detail: PhoneCallState), "ended" (detail: {reason}), "media" (detail: {connectionState, iceConnectionState}), "error" (detail: PhoneError) and "closed" (detail: {code, reason}).
 */
export class CallsPhone extends EventTarget {
	private socket?: WebSocket;
	private currentState: PhoneCallState = {state: "idle"};
	private peer?: RTCPeerConnection;
	private microphone?: MediaStream;
	private readonly speaker: HTMLAudioElement;
	private pendingCandidates: RTCIceCandidateInit[] = [];
	private remoteDescriptionSet = false;
	private wantAudio = false;
	private audioStarting = false;
	private muted = false;
	private closedByUser = false;
	private reconnectDelay: number = PHONE_RECONNECT_DELAYS_MS.first;
	private reconnectTimer?: ReturnType<typeof setTimeout>;
	private nextCommandId = 1;
	private readonly commands = new Map<number, {resolve: (frame: ResultFrame) => void; reject: (error: PhoneError) => void}>();

	/**
	 * Creates the phone.
	 *
	 * @param url - WebSocket URL of CallsRelay on your server
	 */
	constructor(private readonly url: string) {
		super();
		this.speaker = new Audio();
		this.speaker.autoplay = true;
	}

	/**
	 * The latest call state.
	 */
	get state(): PhoneCallState {
		return this.currentState;
	}

	/**
	 * True while this phone carries the call's audio.
	 */
	get hasAudio(): boolean {
		return this.peer !== undefined || this.audioStarting;
	}

	/**
	 * Connects to the relay.
	 *
	 * @returns Promise that resolves when the connection is open
	 */
	connect(): Promise<void> {
		this.closedByUser = false;
		return this.open();
	}

	/**
	 * Calls a chat and connects the microphone and speaker.
	 *
	 * @param chatId - Chat ID of the person to call
	 * @returns Promise resolving to the call ID
	 */
	async dial(chatId: string): Promise<string> {
		return this.startCall({action: "dial", chatId});
	}

	/**
	 * Accepts the incoming call and connects the microphone and speaker.
	 *
	 * @returns Promise resolving to the call ID
	 */
	async accept(): Promise<string> {
		return this.startCall({action: "accept"});
	}

	/**
	 * Connects the microphone and speaker to a call started elsewhere. The call's audio moves to this phone.
	 *
	 * @returns Promise that resolves when the audio offer is sent
	 */
	async join(): Promise<void> {
		const state = this.currentState.state;
		if (state === "inc-call") {
			throw {...PHONE_ACCEPT_FIRST};
		}
		if (!(PHONE_JOINABLE_STATES as readonly string[]).includes(state)) {
			throw {...PHONE_NOTHING_TO_JOIN};
		}
		await this.openMicrophone();
		this.wantAudio = true;
		await this.startAudio();
	}

	/**
	 * Rejects the incoming call.
	 *
	 * @returns Promise resolving to the call ID
	 */
	async reject(): Promise<string> {
		return (await this.command({action: "reject"})).callId ?? "";
	}

	/**
	 * Ends the current call.
	 *
	 * @returns Promise resolving to the call ID
	 */
	async hangUp(): Promise<string> {
		return (await this.command({action: "hangUp"})).callId ?? "";
	}

	/**
	 * Mutes or unmutes the microphone.
	 *
	 * @param muted - True to mute
	 */
	setMuted(muted: boolean): void {
		this.muted = muted;
		this.microphone?.getAudioTracks().forEach((track) => {
			track.enabled = !muted;
		});
	}

	/**
	 * Returns the audio connection statistics of the current call.
	 *
	 * @returns Promise resolving to the statistics, or null when there is no audio connection
	 */
	async getStats(): Promise<PhoneStats | null> {
		const peer = this.peer;
		if (!peer) {
			return null;
		}
		const stats: PhoneStats = {
			connectionState: peer.connectionState,
			iceConnectionState: peer.iceConnectionState,
			microphone: this.microphone?.getAudioTracks()[0]?.label ?? "",
			bytesSent: 0,
			packetsSent: 0,
			bytesReceived: 0,
			packetsReceived: 0,
			packetsLost: 0,
		};
		(await peer.getStats()).forEach((report) => {
			if (report.kind !== "audio") {
				return;
			}
			if (report.type === "outbound-rtp") {
				stats.bytesSent += report.bytesSent ?? 0;
				stats.packetsSent += report.packetsSent ?? 0;
			} else if (report.type === "inbound-rtp") {
				stats.bytesReceived += report.bytesReceived ?? 0;
				stats.packetsReceived += report.packetsReceived ?? 0;
				stats.packetsLost += report.packetsLost ?? 0;
				stats.remoteLevel = report.audioLevel ?? stats.remoteLevel;
			} else if (report.type === "media-source") {
				stats.microphoneLevel = report.audioLevel ?? stats.microphoneLevel;
			}
		});
		return stats;
	}

	/**
	 * Stops the audio and closes the connection. The call itself is not ended.
	 */
	close(): void {
		this.closedByUser = true;
		this.wantAudio = false;
		clearTimeout(this.reconnectTimer);
		this.stopAudio();
		this.socket?.close(PHONE_CLOSE_NORMAL);
		this.socket = undefined;
	}

	private open(): Promise<void> {
		return new Promise((resolve, reject) => {
			const socket = new WebSocket(this.url);
			this.socket = socket;
			let opened = false;

			socket.onopen = () => {
				opened = true;
				this.reconnectDelay = PHONE_RECONNECT_DELAYS_MS.first;
				resolve();
			};
			socket.onmessage = (event) => {
				let frame: RelayFrame;
				try {
					frame = JSON.parse(String(event.data));
				} catch {
					return;
				}
				void this.onFrame(frame);
			};
			socket.onclose = (event) => {
				if (this.socket !== socket) {
					return;
				}
				this.socket = undefined;
				this.failCommands(PHONE_CLOSED);
				if (!opened) {
					reject({code: PHONE_NOT_CONNECTED.code, message: event.reason || PHONE_NOT_CONNECTED.message});
				}
				if (this.closedByUser) {
					return;
				}
				if (event.code >= PHONE_PERMANENT_CLOSE_CODES.min && event.code <= PHONE_PERMANENT_CLOSE_CODES.max) {
					this.wantAudio = false;
					this.stopAudio();
					this.dispatch("closed", {code: event.code, reason: event.reason});
					return;
				}
				if (!opened) {
					return;
				}
				this.stopPeer();
				this.reconnectTimer = setTimeout(() => {
					this.open().catch(() => undefined);
				}, this.reconnectDelay);
				this.reconnectDelay = Math.min(this.reconnectDelay * 2, PHONE_RECONNECT_DELAYS_MS.max);
			};
		});
	}

	private async startCall(command: PhoneCommand): Promise<string> {
		await this.openMicrophone();
		let result: ResultFrame;
		try {
			result = await this.command(command);
		} catch (error) {
			if (this.currentState.state === "idle") {
				this.stopAudio();
			}
			throw error;
		}
		this.wantAudio = true;
		await this.startAudio();
		return result.callId ?? "";
	}

	private command(command: PhoneCommand): Promise<ResultFrame> {
		const socket = this.socket;
		if (!socket || socket.readyState !== WebSocket.OPEN) {
			return Promise.reject({...PHONE_NOT_CONNECTED});
		}
		const id = this.nextCommandId++;
		return new Promise((resolve, reject) => {
			this.commands.set(id, {resolve, reject});
			socket.send(JSON.stringify({type: "command", id, command}));
		});
	}

	private failCommands(error: PhoneError): void {
		this.commands.forEach(({reject}) => reject({...error}));
		this.commands.clear();
	}

	private async startAudio(): Promise<void> {
		if (this.audioStarting) {
			return;
		}
		this.audioStarting = true;
		try {
			await this.connectAudio();
		} finally {
			this.audioStarting = false;
		}
	}

	private async connectAudio(): Promise<void> {
		this.stopPeer();
		const iceServers = (await this.command({action: "iceServers"})).iceServers ?? [];
		if (!this.wantAudio) {
			return;
		}
		const microphone = await this.openMicrophone();
		const peer = new RTCPeerConnection({iceServers});
		this.peer = peer;
		this.remoteDescriptionSet = false;
		this.pendingCandidates = [];
		microphone.getAudioTracks().forEach((track) => peer.addTrack(track, microphone));
		peer.ontrack = (event) => {
			this.speaker.srcObject = event.streams[0] ?? new MediaStream([event.track]);
			void this.speaker.play().catch(() => undefined);
		};
		const reportMedia = () => this.dispatch("media", {connectionState: peer.connectionState, iceConnectionState: peer.iceConnectionState});
		peer.onconnectionstatechange = reportMedia;
		peer.oniceconnectionstatechange = reportMedia;
		peer.onicecandidate = (event) => {
			if (event.candidate) {
				this.send({type: "ice-candidate", candidate: event.candidate.toJSON()});
			}
		};
		const offer = await peer.createOffer();
		await peer.setLocalDescription(offer);
		this.send({type: "offer", offer: {type: "offer", sdp: offer.sdp}});
	}

	private async openMicrophone(): Promise<MediaStream> {
		if (!this.microphone) {
			this.microphone = await navigator.mediaDevices.getUserMedia({audio: true});
			this.setMuted(this.muted);
		}
		return this.microphone;
	}

	private stopPeer(): void {
		this.peer?.close();
		this.peer = undefined;
		this.speaker.srcObject = null;
	}

	private stopAudio(): void {
		this.stopPeer();
		this.microphone?.getTracks().forEach((track) => track.stop());
		this.microphone = undefined;
	}

	private send(frame: object): void {
		if (this.socket?.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify(frame));
		}
	}

	private async onFrame(frame: RelayFrame): Promise<void> {
		switch (frame.type) {
			case "result": {
				const pending = this.commands.get(frame.id);
				this.commands.delete(frame.id);
				if (frame.error) {
					pending?.reject(frame.error);
				} else {
					pending?.resolve(frame);
				}
				return;
			}
			case "state":
				this.onState(frame.state);
				return;
			case "answer":
				if (this.peer) {
					await this.peer.setRemoteDescription(frame.answer);
					this.remoteDescriptionSet = true;
					const candidates = this.pendingCandidates;
					this.pendingCandidates = [];
					for (const candidate of candidates) {
						await this.peer.addIceCandidate(candidate);
					}
				}
				return;
			case "ice-candidate":
				if (!this.peer) {
					return;
				}
				if (this.remoteDescriptionSet) {
					await this.peer.addIceCandidate(frame.candidate);
				} else {
					this.pendingCandidates.push(frame.candidate);
				}
				return;
			case "error":
				this.dispatch("error", {code: "CALL_FAILED", message: frame.message});
				return;
		}
	}

	private onState(state: PhoneCallState): void {
		const previous = this.currentState;
		this.currentState = state;
		if (state.state === "idle") {
			this.wantAudio = false;
			this.stopAudio();
		} else if (this.wantAudio && !this.peer && !this.audioStarting) {
			void this.startAudio().catch((error) => this.dispatch("error", {code: "CALL_FAILED", message: String(error?.message ?? error)}));
		}
		this.dispatch("state", state);
		if (state.state === "idle" && previous.state !== "idle") {
			this.dispatch("ended", {reason: state.reason});
		}
	}

	private dispatch(type: string, detail: unknown): void {
		this.dispatchEvent(new CustomEvent(type, {detail}));
	}
}
