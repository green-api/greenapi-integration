/**
 * Base interface for GREEN-API WhatsApp instances.
 * Contains the essential credentials needed to interact with the API.
 */
export interface BaseInstance {
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
	linkPreview?: boolean;
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

export type QueueMessageType =
	| "sendMessage"
	| "sendPoll"
	| "sendFileByUrl"
	| "sendLocation"
	| "sendContact"
	| "ForwardMessages";

export type QueueMessageBody =
	| SendMessage
	| SendPoll
	| SendFileByUrl
	| SendLocation
	| SendContact
	| ForwardMessages;

export interface QueueMessage {
	messageID?: string;
	messagesIDs?: string[];
	type: QueueMessageType;
	body: QueueMessageBody;
}

export interface ClearMessagesQueue {
	isCleared: boolean;
}

export type MessageType =
	"textMessage"
	| "extendedTextMessage"
	| "imageMessage"
	| "videoMessage"
	| "documentMessage"
	| "audioMessage"
	| "contactMessage"
	| "locationMessage"
	| "pollMessage"
	| "reactionMessage"
	| "pollUpdateMessage"
	| "quotedMessage"
	| "stickerMessage";

export interface GetMessage {
	chatId: string;
	idMessage: string;
}

export interface GetChatHistory {
	chatId: string;
	count?: number;
}

export interface BaseJournalMessage {
	idMessage: string;
	timestamp: number;
	typeMessage: MessageType;
	chatId: string;
	isForwarded: boolean;
	forwardingScore: number;
}

export interface IncomingJournalFields {
	type: "incoming";
	senderId: string;
	senderName: string;
	senderContactName: string;
}

export interface OutgoingJournalFields {
	type: "outgoing";
	statusMessage: OutgoingMessageStatus;
	sendByApi: boolean;
}

export type BaseIncomingJournalMessage = BaseJournalMessage & IncomingJournalFields;
export type BaseOutgoingJournalMessage = BaseJournalMessage & OutgoingJournalFields;
export type BaseJournalResponse = BaseIncomingJournalMessage | BaseOutgoingJournalMessage;

export type OutgoingJournalResponse = BaseOutgoingJournalMessage & WebhookMessageData & {
	quotedMessage?: QuotedMessage;
};

export type IncomingJournalResponse = BaseIncomingJournalMessage & WebhookMessageData & {
	quotedMessage?: QuotedMessage;
};

export type JournalResponse = BaseJournalResponse & WebhookMessageData & {
	quotedMessage?: QuotedMessage;
};

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

export interface ContactsArrayMessageData extends ForwardableMessage {
	contacts: Array<{
		displayName: string;
		vcard: string;
	}>;
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
} | {
	typeMessage: "contactsArrayMessage";
	contacts: Array<{
		displayName: string;
		vcard: string;
	}>;
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
} | {
	typeMessage: "contactsArrayMessage";
	messageData: ContactsArrayMessageData;
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

export interface ReadChat {
	chatId: string;
	idMessage?: string;
}

export interface ReadChatResponse {
	setRead: boolean;
}

export interface CheckWhatsapp {
	phoneNumber: number;
}

export interface CheckWhatsappResponse {
	existsWhatsapp: boolean;
}

export interface GetAvatar {
	chatId: string;
}

export interface GetAvatarResponse {
	urlAvatar: string;
	available: boolean;
}

export type ContactType = "user" | "group";

export interface Contact {
	id: string;
	name: string;
	contactName: string;
	type: ContactType;
}

export interface ProductImageUrls {
	requested: string;
	original: string;
}

export interface ProductReviewStatus {
	whatsapp: string;
}

export interface Product {
	id: string;
	imageUrls: ProductImageUrls;
	reviewStatus: ProductReviewStatus;
	availability: string;
	name: string;
	description?: string;
	price: string | null;
	isHidden: boolean;
}

export interface ContactInfo {
	avatar: string;
	name: string;
	contactName: string;
	email: string;
	category: string;
	description: string;
	products: Product[];
	chatId: string;
	lastSeen: string | null;
	isArchive: boolean;
	isDisappearing: boolean;
	isMute: boolean;
	messageExpiration: number;
	muteExpiration: number | null;
	isBusiness: boolean;
}

export interface ArchiveChat {
	chatId: string;
}

export interface UnarchiveChat {
	chatId: string;
}

export type EphemeralExpiration = 0 | 86400 | 604800 | 7776000;

export interface SetDisappearingChat {
	chatId: string;
	ephemeralExpiration: EphemeralExpiration;
}

export interface SetDisappearingChatResponse {
	chatId: string;
	disappearingMessagesInChat: boolean;
	ephemeralExpiration: EphemeralExpiration;
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

export interface CreateGroup {
	groupName: string;
	chatIds: string[];
}

export interface CreateGroupResponse {
	created: boolean;
	chatId: string;
	groupInviteLink: string;
}

export interface UpdateGroupName {
	groupId: string;
	groupName: string;
}

export interface UpdateGroupNameResponse {
	updateGroupName: boolean;
}

export interface GroupParticipant {
	id: string;
	isAdmin: boolean;
	isSuperAdmin: boolean;
}

export interface GroupData {
	groupId: string;
	owner: string;
	subject: string;
	creation: number;
	participants: GroupParticipant[];
	subjectTime: number;
	subjectOwner: string;
	groupInviteLink: string;
}

export interface GetGroupData {
	groupId: string;
}

export interface AddGroupParticipant {
	groupId: string;
	participantChatId: string;
}

export interface AddGroupParticipantResponse {
	addParticipant: boolean;
}

export interface RemoveGroupParticipant {
	groupId: string;
	participantChatId: string;
}

export interface RemoveGroupParticipantResponse {
	removeParticipant: boolean;
}

export interface SetGroupAdmin {
	groupId: string;
	participantChatId: string;
}

export interface SetGroupAdminResponse {
	setGroupAdmin: boolean;
}

export interface RemoveAdmin {
	groupId: string;
	participantChatId: string;
}

export interface RemoveAdminResponse {
	removeAdmin: boolean;
}

export interface SetGroupPicture {
	groupId: string;
	file: Blob | File;
}

export interface SetGroupPictureResponse {
	setGroupPicture: boolean;
	urlAvatar: string | null;
	reason: string;
}

export interface LeaveGroup {
	groupId: string;
}

export interface LeaveGroupResponse {
	leaveGroup?: boolean;
	removeAdmin?: boolean;
}

export interface BaseRequest {
	headers: Record<string, any>;
	body: any;
}

export interface BaseUser {
	id: number | bigint;

	[key: string]: any;
}
