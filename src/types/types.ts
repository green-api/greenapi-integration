/**
 * Base interface for GREEN-API WhatsApp instances.
 * Contains the essential credentials needed to interact with the API.
 */
interface BaseInstance {
	idInstance: number | bigint;
	apiTokenInstance: string;
	stateInstance?: InstanceState;
	settings?: Settings | Record<string, any>;
}

/**
 * Extended instance interface that allows for additional platform-specific properties.
 * Use this when you need to store extra data with your instance.
 */
export interface Instance extends BaseInstance {
	[key: string]: any;
}

/**
 * Union type representing all possible message formats that can be sent through GREEN-API.
 * Each message type has its own specific structure and required fields.
 */
export type Message =
	| ({
	type: "text";
	message: string;
} & BaseMessage)
	| ({
	type: "upload-file";
	caption?: string;
	file: {
		data: Blob | File;
		fileName: string;
	};
} & BaseMessage)
	| ({
	type: "url-file";
	caption?: string;
	file: {
		url: string;
		fileName: string;
	};
} & BaseMessage)
	| ({
	type: "poll";
	message: string;
	options: PollOption[];
	multipleAnswers?: boolean;
} & BaseMessage)
	| ({
	type: "location";
	nameLocation?: string;
	address?: string;
	latitude: number;
	longitude: number;
} & BaseMessage)
	| ({
	type: "contact";
	contact: {
		phoneContact: number;
		firstName?: string;
		middleName?: string;
		lastName?: string;
		company?: string;
	};
} & BaseMessage)
	| {
	type: "forward";
	chatId: string;
	chatIdFrom: string;
	messages: string[];
};

/**
 * Common properties shared by all message types.
 */
export interface BaseMessage {
	chatId: string;
	quotedMessageId?: string;
}

export type SendMessageType = "text" | "upload-file" | "url-file" | "poll" | "location" | "contact" | "forward";

export interface ForwardMessagesResponse {
	messages: string[];
}

export interface PollOption {
	optionName: string;
}

export type SendMessage = Extract<Message, { type: "text" }>;
export type SendFileByUpload = Extract<Message, { type: "upload-file" }>;
export type SendFileByUrl = Extract<Message, { type: "url-file" }>;
export type SendLocation = Extract<Message, { type: "location" }>;
export type SendContact = Extract<Message, { type: "contact" }>;
export type SendPoll = Extract<Message, { type: "poll" }>;
export type ForwardMessages = Extract<Message, { type: "forward" }>;

export type MessageType =
	"textMessage"
	| "extendedTextMessage"
	| "imageMessage"
	| "videoMessage"
	| "documentMessage"
	| "audioMessage"
	| "contactMessage"
	| "locationMessage"
	| "pollMessage";

export interface ForwardableMessage {
	forwardingScore: number;
	isForwarded: boolean;
}

export interface MediaMessage extends ForwardableMessage {
	jpegThumbnail: string;
}

export interface TextMessageData {
	textMessage: string;
}

export interface ExtendedTextMessageData extends MediaMessage {
	text: string;
	description: string;
	title: string;
}

export interface FileMessageData extends MediaMessage {
	downloadUrl: string;
	caption: string;
	mimeType: string;
	fileName: string;
}

export interface LocationMessageData extends MediaMessage {
	nameLocation: string;
	address: string;
	latitude: number;
	longitude: number;
}

export interface ContactMessageData extends ForwardableMessage {
	displayName: string;
	vcard: string;
}

export interface PollMessageData {
	name: string;
	options: PollOption[];
	multipleAnswers: boolean;
}

type QuotedMessage = {
	stanzaId: string;
	participant: string;
	typeMessage: MessageType;
} & (
	| { typeMessage: "textMessage"; textMessage: string }
	| {
	typeMessage: "contactMessage";
	contact: {
		displayName: string;
		vcard: string;
	};
}
	| {
	typeMessage: "locationMessage";
	location: {
		nameLocation: string;
		address: string;
		jpegThumbnail: string;
		latitude: number;
		longitude: number;
	};
}
	| {
	typeMessage: "imageMessage" | "videoMessage" | "documentMessage" | "audioMessage";
	downloadUrl: string;
	caption: string;
	jpegThumbnail: string;
}
	);

export interface PollVote {
	optionName: string;
	optionVoters: string[];
}

export interface PollUpdateMessageData {
	stanzaId: string;
	name: string;
	votes: PollVote[];
	multipleAnswers: boolean;
}

export type OutgoingMessageStatus =
	| "sent"
	| "delivered"
	| "read"
	| "failed"
	| "noAccount"
	| "notInGroup"
	| "yellowCard";

export type WebhookType =
	"stateInstanceChanged"
	| "outgoingMessageStatus"
	| "outgoingAPIMessageReceived"
	| "outgoingMessageReceived"
	| "incomingMessageReceived"

/**
 * Webhook payload received when a message status changes.
 * Used to track delivery and read receipts.
 */
export interface OutgoingMessageStatusWebhook {
	typeWebhook: "outgoingMessageStatus";
	chatId: string;
	instanceData: {
		idInstance: number;
		wid: string;
		typeInstance: string;
	};
	timestamp: number;
	idMessage: string;
	status: OutgoingMessageStatus;
	description?: string;
	sendByApi: boolean;
}

export interface StateInstanceWebhook {
	typeWebhook: "stateInstanceChanged";
	instanceData: {
		idInstance: number;
		wid: string;  // Empty string when not authorized
		typeInstance: string;
	};
	timestamp: number;
	stateInstance: InstanceState;
}

export type WebhookMessageData =
	| {
	typeMessage: "textMessage";
	textMessageData: TextMessageData;
}
	| {
	typeMessage: "extendedTextMessage";
	extendedTextMessageData: ExtendedTextMessageData;
}
	| {
	typeMessage: "imageMessage" | "videoMessage" | "documentMessage" | "audioMessage";
	fileMessageData: FileMessageData;
}
	| {
	typeMessage: "locationMessage";
	locationMessageData: LocationMessageData;
}
	| {
	typeMessage: "contactMessage";
	contactMessageData: ContactMessageData;
}
	| {
	typeMessage: "pollMessage";
	pollMessageData: PollMessageData;
} | {
	typeMessage: "pollUpdateMessage";
	pollMessageData: PollUpdateMessageData;
};

export interface MessageWebhook {
	typeWebhook: "incomingMessageReceived" | "outgoingMessageReceived" | "outgoingAPIMessageReceived";
	instanceData: {
		idInstance: number;
		wid: string;
		typeInstance: string;
	};
	timestamp: number;
	idMessage: string;
	senderData: {
		chatId: string;
		sender: string;
		chatName: string;
		senderName: string;
		senderContactName?: string;
	};
	messageData: WebhookMessageData & {
		quotedMessage?: QuotedMessage;
	};
}

/**
 * Primary webhook types received from GREEN-API.
 */
export type GreenApiWebhook = MessageWebhook | OutgoingMessageStatusWebhook | StateInstanceWebhook;

/**
 * Configuration settings for a GREEN-API instance.
 * Controls webhook behavior, message handling, and other instance features.
 */
export interface Settings {
	wid?: string;
	webhookUrl?: string;
	webhookUrlToken?: string;
	delaySendMessagesMilliseconds?: number;
	markIncomingMessagesReaded?: "yes" | "no";
	markIncomingMessagesReadedOnReply?: "yes" | "no";
	outgoingWebhook?: "yes" | "no";
	outgoingMessageWebhook?: "yes" | "no";
	outgoingAPIMessageWebhook?: "yes" | "no";
	stateWebhook?: "yes" | "no";
	incomingWebhook?: "yes" | "no";
	keepOnlineStatus?: "yes" | "no";
	pollMessageWebhook?: "yes" | "no";
	incomingCallWebhook?: "yes" | "no";
}

export interface Reboot {
	isReboot: boolean;
}

export interface Logout {
	isLogout: boolean;
}

/**
 * Represents an instance state in the GREEN-API system.
 */
export type InstanceState =
	| "notAuthorized"
	| "authorized"
	| "blocked"
	| "starting"
	| "yellowCard";

export interface StateInstance {
	stateInstance: InstanceState;
}

export interface SendResponse {
	idMessage: string;
}

export interface SendFileByUploadResponse {
	idMessage: string;
	urlFile: string;
}

export interface SetSettingsResponse {
	saveSettings: boolean;
}

export interface QR {
	type: "qrCode" | "error" | "alreadyLogged";
	message: string;
}

export interface GetAuthorizationCode {
	status: boolean;
	code: string;
}

export interface UploadFile {
	urlFile: string;
}

export interface WaSettings {
	avatar: string;
	phone: string;
	stateInstance: InstanceState;
	deviceId: string;
}

export interface SetProfilePicture {
	reason: string | null;
	urlAvatar: string;
	setProfilePicture: boolean;
}

export interface BaseRequest {
	headers: Record<string, any>;
	body: any;
}

export interface BaseUser {
	id: number | bigint;

	[key: string]: any;
}
