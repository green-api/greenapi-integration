import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
	Instance,
	Settings,
	SendMessage,
	SendFileByUrl,
	SendFileByUpload,
	SendPoll,
	StateInstance,
	Reboot,
	Logout,
	QR,
	SendResponse,
	SendFileByUploadResponse,
	SetSettingsResponse,
	GetAuthorizationCode,
	SetProfilePicture,
	WaSettings,
	UploadFile,
	SendLocation,
	SendContact,
	ForwardMessages,
	ForwardMessagesResponse,
	QueueMessage,
	ClearMessagesQueue,
	ReadChatResponse,
	ReadChat,
	CheckWhatsapp,
	CheckWhatsappResponse,
	GetAvatarResponse,
	GetAvatar,
	Contact,
	ContactInfo,
	ArchiveChat,
	UnarchiveChat,
	SetDisappearingChat,
	SetDisappearingChatResponse,
	CreateGroupResponse,
	CreateGroup,
	UpdateGroupName,
	UpdateGroupNameResponse,
	GetGroupData,
	GroupData,
	AddGroupParticipant,
	AddGroupParticipantResponse,
	RemoveGroupParticipant,
	RemoveGroupParticipantResponse,
	SetGroupAdmin,
	SetGroupAdminResponse,
	RemoveAdminResponse,
	RemoveAdmin,
	SetGroupPicture,
	SetGroupPictureResponse,
	LeaveGroup,
	LeaveGroupResponse,
	GetMessage,
	JournalResponse,
	GetChatHistory,
	IncomingJournalResponse, OutgoingJournalResponse,
} from "../types/types";

/**
 * Client for direct interaction with GREEN-API's WhatsApp gateway.
 * Provides methods for sending messages, managing instances, and handling files.
 * For more information about the methods, refer to https://green-api.com/en/docs
 *
 * @category Client
 *
 * @example
 * ```typescript
 * const client = new GreenApiClient({
 *   idInstance: 12345,
 *   apiTokenInstance: "your-token"
 * });
 *
 * await client.sendMessage({
 *   chatId: "1234567890@c.us",
 *   message: "Hello from GREEN-API!"
 * });
 * ```
 */
export class GreenApiClient {
	private client: AxiosInstance;
	private readonly baseUrl = "https://api.green-api.com";

	/**
	 * Creates a GREEN-API client instance.
	 *
	 * @param instance - Configuration containing idInstance and apiTokenInstance
	 */
	constructor(private instance: Instance) {
		this.client = axios.create({
			baseURL: this.buildUrl(),
		});
	}

	private buildUrl(): string {
		return `${this.baseUrl}/waInstance${this.instance.idInstance}`;
	}

	private buildEndpoint(endpoint: string): string {
		return `/${endpoint}/${this.instance.apiTokenInstance}`;
	}

	private async makeRequest<T>(
		method: "get" | "post",
		endpoint: string,
		data?: any,
		queryParams?: Record<string, string | number>,
		config?: any,
	): Promise<T> {
		try {
			const url = this.buildEndpoint(endpoint) + (queryParams ? "?" + new URLSearchParams(
				Object.entries(queryParams).map(([key, value]) => [key, value.toString()]),
			).toString() : "");

			const response: AxiosResponse<T> = await (method === "get"
				? this.client.get(url, config)
				: this.client.post(url, data, config));
			return response.data;
		} catch (error: any) {
			throw new Error(`Failed to ${endpoint.replace(/([A-Z])/g, " $1").toLowerCase()}: ${error.message}. ${JSON.stringify(error.response?.data)}`);
		}
	}

	private async makeFileUploadRequest<T>(
		endpoint: string,
		formData: FormData,
		headers?: Record<string, string>,
	): Promise<T> {
		return this.makeRequest(
			"post",
			endpoint,
			formData,
			undefined,
			{
				headers: {"Content-Type": "multipart/form-data"},
				...headers,
			},
		);
	}

	/**
	 * Sends a text message to a WhatsApp chat.
	 *
	 * @param message - Message data containing chat ID and text
	 * @returns Promise resolving to send response with message ID
	 *
	 * @example
	 * ```typescript
	 * await client.sendMessage({
	 *   chatId: "1234567890@c.us",
	 *   message: "Hello!",
	 *   quotedMessageId: "12345" // Optional: reply to a message
	 * });
	 * ```
	 */
	async sendMessage(message: SendMessage): Promise<SendResponse> {
		return this.makeRequest("post", "sendMessage", {
			chatId: message.chatId,
			message: message.message,
			quotedMessageId: message.quotedMessageId,
		});
	}

	/**
	 * Sends a file from a URL to a WhatsApp chat.
	 *
	 * @param message - Message data containing chat ID and file URL
	 * @returns Promise resolving to send response
	 *
	 * @example
	 * ```typescript
	 * await client.sendFileByUrl({
	 *   chatId: "1234567890@c.us",
	 *   file: {
	 *     url: "https://example.com/file.pdf",
	 *     fileName: "document.pdf"
	 *   },
	 *   caption: "Check this file" // Optional
	 * });
	 * ```
	 */
	async sendFileByUrl(message: SendFileByUrl): Promise<SendResponse> {
		return this.makeRequest("post", "sendFileByUrl", {
			chatId: message.chatId,
			urlFile: message.file.url,
			fileName: message.file.fileName,
			caption: message.caption,
			quotedMessageId: message.quotedMessageId,
		});
	}

	/**
	 * Sends a file from local data to a WhatsApp chat.
	 *
	 * @param message - Message data containing chat ID and file data
	 * @returns Promise resolving to send response with file URL
	 *
	 * @example
	 * ```typescript
	 * await client.sendFileByUpload({
	 *   chatId: "1234567890@c.us",
	 *   file: {
	 *     data: fileBlob,
	 *     fileName: "image.jpg"
	 *   },
	 *   caption: "Check this image"
	 * });
	 * ```
	 */
	async sendFileByUpload(message: SendFileByUpload): Promise<SendFileByUploadResponse> {
		const formData = new FormData();
		formData.append("file", message.file.data);
		formData.append("chatId", message.chatId);
		formData.append("fileName", message.file.fileName);
		if (message.caption) formData.append("caption", message.caption);
		if (message.quotedMessageId) formData.append("quotedMessageId", message.quotedMessageId);

		return this.makeFileUploadRequest("sendFileByUpload", formData);
	}

	/**
	 * Creates a poll in a WhatsApp chat.
	 *
	 * @param message - Poll data with question and options
	 * @returns Promise resolving to send response
	 *
	 * @example
	 * ```typescript
	 * await client.sendPoll({
	 *   chatId: "1234567890@c.us",
	 *   message: "What's your favorite color?",
	 *   options: ["Red", "Blue", "Green"],
	 *   multipleAnswers: false
	 * });
	 * ```
	 */
	async sendPoll(message: SendPoll): Promise<SendResponse> {
		return this.makeRequest("post", "sendPoll", {
			chatId: message.chatId,
			message: message.message,
			options: message.options,
			multipleAnswers: message.multipleAnswers,
			quotedMessageId: message.quotedMessageId,
		});
	}

	/**
	 * Forwards messages from one chat to another.
	 *
	 * @param request - Forward request with source and target chat IDs
	 * @returns Promise resolving to forward response
	 */
	async forwardMessages(request: ForwardMessages): Promise<ForwardMessagesResponse> {
		return this.makeRequest("post", "forwardMessages", {
			chatId: request.chatId,
			chatIdFrom: request.chatIdFrom,
			messages: request.messages,
		});
	}

	/**
	 * Sends a location to a WhatsApp chat.
	 *
	 * @param message - Location data with coordinates
	 * @returns Promise resolving to send response
	 *
	 * @example
	 * ```typescript
	 * await client.sendLocation({
	 *   chatId: "1234567890@c.us",
	 *   latitude: 51.5074,
	 *   longitude: -0.1278,
	 *   nameLocation: "London",
	 *   address: "London, UK"
	 * });
	 * ```
	 */
	async sendLocation(message: SendLocation): Promise<SendResponse> {
		return this.makeRequest("post", "sendLocation", {
			chatId: message.chatId,
			nameLocation: message.nameLocation,
			address: message.address,
			latitude: message.latitude,
			longitude: message.longitude,
			quotedMessageId: message.quotedMessageId,
		});
	}

	/**
	 * Sends a contact card to a WhatsApp chat.
	 *
	 * @param message - Contact data
	 * @returns Promise resolving to send response
	 *
	 * @example
	 * ```typescript
	 * await client.sendContact({
	 *   chatId: "1234567890@c.us",
	 *   contact: {
	 *     phoneContact: 1234567890,
	 *     firstName: "John",
	 *     lastName: "Doe"
	 *   }
	 * });
	 * ```
	 */
	async sendContact(message: SendContact): Promise<SendResponse> {
		return this.makeRequest("post", "sendContact", {
			chatId: message.chatId,
			contact: message.contact,
			quotedMessageId: message.quotedMessageId,
		});
	}

	/**
	 * Reboots the GREEN-API instance.
	 *
	 * @returns Promise resolving to reboot status
	 */
	async reboot(): Promise<Reboot> {
		return this.makeRequest("get", "reboot");
	}

	/**
	 * Logs out from the GREEN-API instance.
	 *
	 * @returns Promise resolving to logout status
	 */
	async logout(): Promise<Logout> {
		return this.makeRequest("get", "logout");
	}

	/**
	 * Gets the current state of the GREEN-API instance.
	 *
	 * @returns Promise resolving to instance state
	 */
	async getStateInstance(): Promise<StateInstance> {
		return this.makeRequest("get", "getStateInstance");
	}

	/**
	 * Gets the QR code for GREEN-API instance authentication.
	 *
	 * @returns Promise resolving to QR code data
	 */
	async getQR(): Promise<QR> {
		return this.makeRequest("get", "qr");
	}

	/**
	 * Gets current instance settings.
	 *
	 * @returns Promise resolving to settings object
	 */
	async getSettings(): Promise<Settings> {
		return this.makeRequest("get", "getSettings");
	}

	/**
	 * Updates instance settings.
	 *
	 * @param settings - New settings to apply
	 * @returns Promise resolving to settings update response
	 */
	async setSettings(settings: Settings): Promise<SetSettingsResponse> {
		return this.makeRequest("post", "setSettings", settings);
	}

	/**
	 * Gets WhatsApp-specific settings.
	 *
	 * @returns Promise resolving to WhatsApp settings
	 */
	async getWaSettings(): Promise<WaSettings> {
		return this.makeRequest("get", "getWaSettings");
	}

	/**
	 * Sets the profile picture for the WhatsApp account.
	 *
	 * @param file - Image file to use as profile picture
	 * @returns Promise resolving to profile picture update response
	 */
	async setProfilePicture(file: Blob | File): Promise<SetProfilePicture> {
		const formData = new FormData();
		formData.append("file", file);
		return this.makeFileUploadRequest("setProfilePicture", formData);
	}

	/**
	 * Uploads a file to GREEN-API servers.
	 *
	 * @param file - File to upload
	 * @param customFileName - Optional custom name for the file
	 * @returns Promise resolving to upload response with file URL
	 */
	async uploadFile(file: Blob | File, customFileName?: string): Promise<UploadFile> {
		const formData = new FormData();
		formData.append("file", file);

		const headers: Record<string, string> = {};

		if (file instanceof File) {
			const mimeType = file.type;
			if (mimeType) {
				headers["Content-Type"] = mimeType;
			} else if (customFileName) {
				headers["GA-Filename"] = customFileName;
			}
		} else if (customFileName) {
			headers["GA-Filename"] = customFileName;
		}

		return this.makeFileUploadRequest("uploadFile", formData, headers);
	}

	/**
	 * Gets authorization code for a phone number.
	 *
	 * @param phoneNumber - Phone number to get code for
	 * @returns Promise resolving to authorization code response
	 * @throws {Error} If phone number is not an integer
	 */
	async getAuthorizationCode(phoneNumber: number): Promise<GetAuthorizationCode> {
		if (!Number.isInteger(phoneNumber)) {
			throw new Error("Phone number must contain only digits");
		}
		return this.makeRequest("post", "getAuthorizationCode", {phoneNumber});
	}

	/**
	 * Gets the list of messages in the sending queue.
	 * Messages are stored for 24 hours and will be sent immediately after phone authorization.
	 * The sending speed is regulated by the Message Sending Interval parameter.
	 *
	 * @returns Promise resolving to an array of queued messages
	 *
	 * @example
	 * ```typescript
	 * const queuedMessages = await client.showMessagesQueue();
	 * console.log(queuedMessages);
	 * ```
	 */
	async showMessagesQueue(): Promise<QueueMessage[]> {
		return this.makeRequest("get", "showMessagesQueue");
	}

	/**
	 * Clears the queue of messages waiting to be sent.
	 * Important when switching phone numbers to prevent sending queued messages with the new number.
	 *
	 * @returns Promise resolving to queue clearing status
	 *
	 * @example
	 * ```typescript
	 * const result = await client.clearMessagesQueue();
	 * if (result.isCleared) {
	 *   console.log('Queue successfully cleared');
	 * }
	 * ```
	 */
	async clearMessagesQueue(): Promise<ClearMessagesQueue> {
		return this.makeRequest("get", "clearMessagesQueue");
	}

	/**
	 * Marks messages in a chat as read.
	 * For this to work, "Receive webhooks on incoming messages and files" setting must be enabled.
	 * Note: Only messages received after enabling the setting can be marked as read.
	 *
	 * @param params - Parameters specifying which messages to mark as read
	 * @returns Promise resolving to read status
	 *
	 * @example
	 * ```typescript
	 * // Mark all messages in chat as read
	 * const result = await client.readChat({
	 *   chatId: "1234567890@c.us"
	 * });
	 *
	 * // Mark specific message as read
	 * const result = await client.readChat({
	 *   chatId: "1234567890@c.us",
	 *   idMessage: "B275A7AA0D6EF89BB9245169BDF174E6"
	 * });
	 * ```
	 */
	async readChat(params: ReadChat): Promise<ReadChatResponse> {
		return this.makeRequest("post", "readChat", params);
	}

	/**
	 * Checks WhatsApp account availability on a phone number.
	 *
	 * @param params - Parameters containing the phone number to check
	 * @returns Promise resolving to WhatsApp availability status
	 * @throws {Error} If phone number is not an integer or not 11-12 digits
	 *
	 * @example
	 * ```typescript
	 * const result = await client.checkWhatsapp({
	 *   phoneNumber: 11001234567
	 * });
	 *
	 * if (result.existsWhatsapp) {
	 *   console.log('WhatsApp account exists');
	 * }
	 * ```
	 */
	async checkWhatsapp(params: CheckWhatsapp): Promise<CheckWhatsappResponse> {
		const phoneStr = params.phoneNumber.toString();
		if (!Number.isInteger(params.phoneNumber)) {
			throw new Error("Phone number must contain only digits");
		}
		if (phoneStr.length < 11 || phoneStr.length > 12) {
			throw new Error("Phone number must be 11 or 12 digits");
		}
		return this.makeRequest("post", "checkWhatsapp", params);
	}

	/**
	 * Gets a user or group chat avatar.
	 *
	 * @param params - Parameters containing the chat ID
	 * @returns Promise resolving to avatar information
	 */
	async getAvatar(params: GetAvatar): Promise<GetAvatarResponse> {
		return this.makeRequest("post", "getAvatar", params);
	}

	/**
	 * Gets a list of the current account contacts.
	 * Note: Contact information updates can take up to 5 minutes.
	 * If an empty array is received, retry the method call.
	 *
	 * @returns Promise resolving to array of contacts
	 */
	async getContacts(): Promise<Contact[]> {
		return this.makeRequest("get", "getContacts");
	}

	/**
	 * Gets detailed information about a contact.
	 * Note: This method does not support group chats, use getGroupData for groups.
	 *
	 * @param params - Parameters containing the chat ID
	 * @returns Promise resolving to contact information
	 */
	async getContactInfo(params: GetAvatar): Promise<ContactInfo> {
		return this.makeRequest("post", "getContactInfo", params);
	}

	/**
	 * Archives a chat. Chat must have at least one incoming message.
	 * Note: "Receive webhooks on incoming messages and files" setting must be enabled.
	 *
	 * @param params - Parameters containing the chat ID to archive
	 * @returns Promise resolving to void on success
	 */
	async archiveChat(params: ArchiveChat): Promise<void> {
		return this.makeRequest("post", "archiveChat", params);
	}

	/**
	 * Unarchives a chat.
	 *
	 * @param params - Parameters containing the chat ID to unarchive
	 * @returns Promise resolving to void on success
	 */
	async unarchiveChat(params: UnarchiveChat): Promise<void> {
		return this.makeRequest("post", "unarchiveChat", params);
	}

	/**
	 * Changes settings of disappearing messages in chats.
	 * Valid expiration times: 0 (off), 86400 (24h), 604800 (7d), 7776000 (90d)
	 *
	 * @param params - Parameters containing chat ID and message expiration time
	 * @returns Promise resolving to chat disappearing message settings
	 */
	async setDisappearingChat(params: SetDisappearingChat): Promise<SetDisappearingChatResponse> {
		return this.makeRequest("post", "setDisappearingChat", params);
	}

	/**
	 * Creates a group chat.
	 * Note: Limited to creating 1 group per 5 minutes to simulate human behavior.
	 *
	 * @param params - Parameters containing group name and participant IDs
	 * @returns Promise resolving to group creation result
	 */
	async createGroup(params: CreateGroup): Promise<CreateGroupResponse> {
		return this.makeRequest("post", "createGroup", params);
	}

	/**
	 * Changes a group chat name.
	 *
	 * @param params - Parameters containing group ID and new name
	 * @returns Promise resolving to update status
	 */
	async updateGroupName(params: UpdateGroupName): Promise<UpdateGroupNameResponse> {
		return this.makeRequest("post", "updateGroupName", params);
	}

	/**
	 * Gets group chat data.
	 * Note: groupInviteLink will be empty if user is not an admin or owner.
	 *
	 * @param params - Parameters containing group ID
	 * @returns Promise resolving to group data
	 */
	async getGroupData(params: GetGroupData): Promise<GroupData> {
		return this.makeRequest("post", "getGroupData", params);
	}

	/**
	 * Adds a participant to a group chat.
	 * Note: Only group administrators can add members.
	 * The participant's number should be saved in the phonebook for reliable addition.
	 *
	 * @param params - Parameters containing group ID and participant ID
	 * @returns Promise resolving to addition status
	 */
	async addGroupParticipant(params: AddGroupParticipant): Promise<AddGroupParticipantResponse> {
		return this.makeRequest("post", "addGroupParticipant", params);
	}

	/**
	 * Removes a participant from a group chat.
	 *
	 * @param params - Parameters containing group ID and participant ID to remove
	 * @returns Promise resolving to removal status
	 */
	async removeGroupParticipant(params: RemoveGroupParticipant): Promise<RemoveGroupParticipantResponse> {
		return this.makeRequest("post", "removeGroupParticipant", params);
	}

	/**
	 * Sets a group chat participant as an administrator.
	 *
	 * @param params - Parameters containing group ID and participant ID to promote
	 * @returns Promise resolving to admin status change result
	 */
	async setGroupAdmin(params: SetGroupAdmin): Promise<SetGroupAdminResponse> {
		return this.makeRequest("post", "setGroupAdmin", params);
	}

	/**
	 * Removes administrator rights from a group chat participant.
	 *
	 * @param params - Parameters containing group ID and participant ID to demote
	 * @returns Promise resolving to admin removal status
	 */
	async removeAdmin(params: RemoveAdmin): Promise<RemoveAdminResponse> {
		return this.makeRequest("post", "removeAdmin", params);
	}

	/**
	 * Sets a group chat picture.
	 *
	 * @param params - Parameters containing group ID and picture file (jpg)
	 * @returns Promise resolving to picture update status
	 */
	async setGroupPicture(params: SetGroupPicture): Promise<SetGroupPictureResponse> {
		const formData = new FormData();
		formData.append("file", params.file);
		formData.append("groupId", params.groupId);

		return this.makeFileUploadRequest("setGroupPicture", formData);
	}

	/**
	 * Makes the current account leave a group chat.
	 *
	 * @param params - Parameters containing the group ID to leave
	 * @returns Promise resolving to leave status
	 */
	async leaveGroup(params: LeaveGroup): Promise<LeaveGroupResponse> {
		return this.makeRequest("post", "leaveGroup", params);
	}

	/**
	 * Gets details of a specific message.
	 * Note: To receive incoming webhooks, requires "Receive webhooks on incoming messages and files" setting to be enabled.
	 * Note: To receive statuses of sent messsages, requires "Receive notifications about the statuses of sent messages" to be enabled.
	 * Messages can take up to 2 minutes to appear in the journal.
	 *
	 * @param params - Parameters containing chat ID and message ID
	 * @returns Promise resolving to message details
	 */
	async getMessage(params: GetMessage): Promise<JournalResponse> {
		return this.makeRequest("post", "getMessage", params);
	}

	/**
	 * Gets chat message history.
	 * Note: Requires "Receive webhooks" setting to be enabled.
	 * Messages can take up to 2 minutes to appear in history.
	 *
	 * @param params - Parameters containing chat ID and optional message count
	 * @returns Promise resolving to array of messages
	 */
	async getChatHistory(params: GetChatHistory): Promise<JournalResponse[]> {
		return this.makeRequest("post", "getChatHistory", params);
	}

	/**
	 * Gets last incoming messages for the specified time period.
	 * Default is 24 hours (1440 minutes).
	 * Note: Requires "Receive webhooks" setting to be enabled.
	 * Messages can take up to 2 minutes to appear in history.
	 *
	 * @param minutes - Optional time period in minutes
	 * @returns Promise resolving to array of incoming messages
	 */
	async lastIncomingMessages(minutes?: number): Promise<IncomingJournalResponse[]> {
		return this.makeRequest("get", "lastIncomingMessages", undefined, minutes ? {minutes} : undefined);
	}

	/**
	 * Gets last outgoing messages for the specified time period.
	 * Default is 24 hours (1440 minutes).
	 * Note: Requires "Receive webhooks" setting to be enabled.
	 * Messages can take up to 2 minutes to appear in history.
	 *
	 * @param minutes - Optional time period in minutes
	 * @returns Promise resolving to array of outgoing messages
	 */
	async lastOutgoingMessages(minutes?: number): Promise<OutgoingJournalResponse[]> {
		return this.makeRequest("get", "lastOutgoingMessages", undefined, minutes ? {minutes} : undefined);
	}
}
