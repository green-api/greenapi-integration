export const DEFAULT_API_URL = "https://api.green-api.com";
export const REDACTED_TOKEN = "***";
export const DEFAULT_PICTURE_FILE_NAME = "picture.jpg";

export const CALL_END_STATUSES = ["hangUp", "declined", "missed", "invalid"] as const;

export const CALL_EVENT_DESCRIPTIONS = {
	incoming: {
		offer: "Incoming call",
		pickUp: "Call answered",
		hangUp: "Call ended",
		declined: "Call declined",
		missed: "Missed call",
		invalid: "Call failed",
	},
	outgoing: {
		offer: "Calling",
		pickUp: "Call answered",
		hangUp: "Call ended",
		declined: "Call declined",
		missed: "No answer",
		invalid: "Number unreachable",
	},
} as const;

export const CALL_ERROR_MESSAGES = {
	INVALID_CHAT_ID: "Invalid phone number or chat for a call",
	CALLS_NOT_ENABLED: "Calls are not enabled for this instance",
	NOT_IN_TARIFF: "The instance plan does not include calls",
	NO_RECENT_CONTACT: "Outgoing calls are allowed only to chats that wrote or called in the last 72 hours",
	INSTANCE_NOT_FOUND: "Instance not found",
	INSTANCE_NOT_READY: "The instance is not running yet, try again later",
	ALREADY_IN_CALL: "The instance is already in a call",
	NO_INCOMING_CALL: "There is no incoming call to answer",
	NO_ACTIVE_CALL: "There is no active call",
	CALL_ENDED: "The call has already ended",
	CALL_REFUSED: "WhatsApp refused the call",
	CALL_FAILED: "The call could not be completed",
	TIMEOUT: "The calls server did not answer in time",
	INVALID_AUDIO: "The audio could not be played: pcmSampleRate must be one of 8000, 12000, 16000, 24000, 48000",
	MISSING_OPUS_CODEC: "Live PCM audio needs the optional Opus codec, install it with: npm install opusscript",
} as const;

export const CALL_ERROR_MATCHERS = {
	noRecentContact: "72 hours",
	notInTariff: "tariff",
	alreadyInCall: "already in a call",
	noIncomingCall: "no incoming call",
	noActiveCall: "no active call",
	notInitialized: "not initialized",
} as const;

export const CALL_END_REASON_DESCRIPTIONS: Record<string, string> = {
	hungUp: "Call ended",
	hangup: "Call ended",
	timeout: "No answer",
	accepted_elsewhere: "Answered on another device",
	rejected_elsewhere: "Declined on another device",
	"no-media": "No audio was transmitted",
	"connect-timeout": "The audio connection could not be established",
	"instance-gone": "The instance became unavailable",
	rejected: "Call declined",
};

export const CALLS_RTC_PERMANENT_CLOSE_CODES = {min: 4000, max: 4999} as const;
export const CALLS_RTC_RECONNECT_DELAYS_MS = {first: 500, max: 10000} as const;
export const CALLS_RTC_CLOSE_NORMAL = 1000;
export const CALLS_RTC_REFUSED_HTTP_STATUSES: readonly number[] = [403];
export const CALLS_RELAY_CLOSE_UPSTREAM_LOST = 1012;
export const CALLS_RELAY_FORWARDED_FRAMES = ["offer", "ice-candidate", "stop"] as const;
export const CALLS_RELAY_ACTIONS = ["dial", "accept", "reject", "hangUp", "iceServers"] as const;
export const CALLS_RELAY_MAX_FRAME_BYTES = 64 * 1024;
export const CALLS_RELAY_UNAUTHORIZED_RESPONSE = "HTTP/1.1 401 Unauthorized\r\nConnection: close\r\n\r\n";

export const CALL_VOICE_FFMPEG_PATH = "ffmpeg";
export const CALL_VOICE_LOOPBACK_HOST = "127.0.0.1";
export const CALL_VOICE_OPUS = {mimeType: "audio/opus", clockRate: 48000, channels: 2} as const;
export const CALL_VOICE_FFMPEG_INPUT_ARGS = ["-hide_banner", "-loglevel", "error", "-re"];
export const CALL_VOICE_FFMPEG_OUTPUT_ARGS = [
	"-vn", "-ac", "1", "-ar", "48000", "-c:a", "libopus", "-b:a", "32k",
	"-application", "lowdelay", "-frame_duration", "20", "-f", "rtp",
];
export const CALL_VOICE_GATHER_WAIT_MS = 1000;
export const CALL_VOICE_RTP_PACKET_SIZE = 1200;
export const CALL_VOICE_STDIN_INPUT = "pipe:0";
export const CALL_VOICE_PCM_SAMPLE_RATES: readonly number[] = [8000, 12000, 16000, 24000, 48000];
export const CALL_VOICE_DEFAULT_PCM_SAMPLE_RATE = 24000;
export const CALL_VOICE_PCM_BYTES_PER_SAMPLE = 2;
export const CALL_VOICE_FRAME_MS = 20;
export const CALL_VOICE_MAX_SEND_LAG_MS = 200;
export const CALL_VOICE_MAX_GAP_FILL_MS = 10000;
export const CALL_VOICE_OPUS_BITRATE = 32000;
export const CALL_VOICE_OPUS_PAYLOAD_TYPE = 111;
export const CALL_VOICE_SEQUENCE_MODULO = 0x10000;
export const CALL_VOICE_TIMESTAMP_MODULO = 0x100000000;
