export interface BaseInstance {
	idInstance: number | bigint;
	apiTokenInstance: string;
	settings?: any;
}

export interface Instance extends BaseInstance {
	[key: string]: any;
}

export type Message = SendMessage | SendFileByUpload | SendFileByUrl | SendPoll | SendLocation | SendContact | ForwardMessages;

export interface BaseMessage {
	type: SendMessageType;
	chatId: string;
	quotedMessageId?: string;
}

export type SendMessageType = "text" | "upload-file" | "url-file" | "poll" | "location" | "contact" | "forward";

export interface SendMessage extends BaseMessage {
	type: "text";
	message: string;
}

export interface ForwardMessages {
	type: "forward";
	chatId: string;
	chatIdFrom: string;
	messages: string[];
}

export interface ForwardMessagesResponse {
	messages: string[];
}

export interface Contact {
	phoneContact: number;
	firstName?: string;
	middleName?: string;
	lastName?: string;
	company?: string;
}

export interface SendContact extends BaseMessage {
	type: "contact";
	contact: Contact;
}

export interface SendFileByUpload extends BaseMessage {
	type: "upload-file";
	caption?: string;
	file: {
		data: Blob | File;
		fileName: string;
	};
}

export interface SendFileByUrl extends BaseMessage {
	type: "url-file";
	caption?: string;
	file: {
		url: string;
		fileName: string;
	};
}

export interface SendLocation extends BaseMessage {
	type: "location";
	nameLocation?: string;
	address?: string;
	latitude: number;
	longitude: number;
}

export interface PollOption {
	optionName: string;
}

export interface SendPoll extends BaseMessage {
	type: "poll";
	message: string;
	options: PollOption[];
	multipleAnswers?: boolean;
}

export type MessageType =
	"textMessage"
	| "extendedTextMessage"
	| "imageMessage"
	| "videoMessage"
	| "documentMessage"
	| "audioMessage";

export interface IncomingGreenApiWebhook {
	typeWebhook: string;
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
		chatName?: string;
		senderName?: string;
		senderContactName?: string;
	};
	messageData: {
		typeMessage: MessageType;
		textMessageData?: {
			textMessage: string;
		};
		extendedTextMessageData?: {
			text: string;
			description?: string;
			title?: string;
			jpegThumbnail?: string;
			forwardingScore?: number;
			isForwarded?: boolean;
		};
		fileMessageData?: {
			downloadUrl: string;
			caption?: string;
			jpegThumbnail?: string;
			mimeType: string;
			forwardingScore?: number;
			isForwarded?: boolean;
			fileName: string;
		};
	};
}

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
