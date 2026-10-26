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
	AccountSettings,
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
	CheckAccount,
	CheckAccountResponse,
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
	IncomingJournalResponse, OutgoingJournalResponse, SendInteractiveButtons, SendInteractiveButtonsReply,
	SendTextStatus, SendVoiceStatus, SendMediaStatus, GetStatusStatisticResponse,
	GreenApiClientOptions, GreenApiClientLogger, ReceiveNotificationResponse, DeleteNotificationResponse,
} from "../types/types";
import { IntegrationError } from "./errors";
import { GreenApiLogger } from "./logger";
import { DEFAULT_API_URL, DEFAULT_PICTURE_FILE_NAME, REDACTED_TOKEN } from "../defaults";

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
	private mediaClient: AxiosInstance;
	private readonly baseUrl: string;
	private readonly mediaBaseUrl: string;
	private readonly gaLogger: GreenApiClientLogger | null;

	/**
	 * Creates a GREEN-API client instance.
	 *
	 * @param instance - Configuration containing idInstance, apiTokenInstance and optionally apiUrl and mediaUrl
	 * @param options - Client options, e.g. `logger: null` to disable request logging
	 */
	constructor(private instance: Instance, options: GreenApiClientOptions = {}) {
		this.baseUrl = (instance.apiUrl || DEFAULT_API_URL).replace(/\/+$/, "");
		this.mediaBaseUrl = (instance.mediaUrl || this.baseUrl).replace(/\/+$/, "");
		this.client = axios.create({
			baseURL: this.buildUrl(this.baseUrl),
		});
		this.mediaClient = axios.create({
			baseURL: this.buildUrl(this.mediaBaseUrl),
		});
		this.gaLogger = options.logger === undefined ? GreenApiLogger.getInstance(GreenApiClient.name) : options.logger;
	}

	private buildUrl(host: string): string {
		return `${host}/waInstance${this.instance.idInstance}`;
	}

	private toBlob(data: Blob | Uint8Array): Blob {
		return data instanceof Blob ? data : new Blob([data as Uint8Array<ArrayBuffer>]);
	}

	private toBuffer(data: Uint8Array): Buffer {
		return Buffer.isBuffer(data) ? data : Buffer.from(data.buffer, data.byteOffset, data.byteLength);
	}

	private buildEndpoint(endpoint: string): string {
		return `/${endpoint}/${this.instance.apiTokenInstance}`;
	}

	private redactToken(text: string): string {
		const token = this.instance.apiTokenInstance;
		return token ? text.split(token).join(REDACTED_TOKEN) : text;
	}

	private async makeRequest<T>(
		method: "get" | "post" | "delete",
		endpoint: string,
		data?: any,
		queryParams?: Record<string, string | number>,
		config?: any,
		pathAfterToken?: string,
		host: "api" | "media" = "api",
	): Promise<T> {
		try {
			this.gaLogger?.info("Making a request", {
				idInstance: this.instance.idInstance,
				endpoint,
				method,
				data: Buffer.isBuffer(data) ? `${data.length} bytes` : data,
				queryParams,
				config,
			});
			const url = this.buildEndpoint(endpoint) + (pathAfterToken ? `/${pathAfterToken}` : "") + (queryParams ? "?" + new URLSearchParams(
				Object.entries(queryParams).map(([key, value]) => [key, value.toString()]),
			).toString() : "");
			const client = host === "media" ? this.mediaClient : this.client;

			let response: AxiosResponse<T>;
			if (method === "get") {
				response = await client.get(url, config);
			} else if (method === "delete") {
				response = await client.delete(url, config);
			} else {
				response = await client.post(url, data, config);
			}
			return response.data;
		} catch (error: any) {
			const responseData = error.response?.data === undefined
				? undefined
				: JSON.parse(this.redactToken(JSON.stringify(error.response.data)));
			const reason = this.redactToken(String(error.message));
			throw new IntegrationError(
				`Failed to ${endpoint.replace(/([A-Z])/g, " $1").toLowerCase()}: ${reason}${responseData === undefined ? "" : `. ${JSON.stringify(responseData)}`}`,
				"INTEGRATION_ERROR",
				error.response?.status ?? 500,
				responseData,
			);
		}
	}

	private async makeFileUploadRequest<T>(
		endpoint: string,
		formData: FormData,
		host: "api" | "media" = "api",
	): Promise<T> {
		return this.makeRequest(
			"post",
			endpoint,
			formData,
			undefined,
			{headers: {"Content-Type": "multipart/form-data"}},
			undefined,
			host,
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
		formData.append("file", this.toBlob(message.file.data), message.file.fileName);
		formData.append("chatId", message.chatId);
		formData.append("fileName", message.file.fileName);
		if (message.caption) formData.append("caption", message.caption);
		if (message.quotedMessageId) formData.append("quotedMessageId", message.quotedMessageId);

		return this.makeFileUploadRequest("sendFileByUpload", formData, "media");
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
	 * Sends interactive buttons to a WhatsApp chat.
	 * Supports copy, call, url, and reply button types.
	 *
	 * @param message - Interactive buttons message data
	 * @returns Promise resolving to send response
	 *
	 * @example
	 * ```typescript
	 * await client.sendInteractiveButtons({
	 *   chatId: "1234567890@c.us",
	 *   header: "Choose an option",
	 *   body: "Please select one of the following:",
	 *   footer: "Powered by GREEN-API",
	 *   buttons: [
	 *     {
	 *       type: "copy",
	 *       buttonId: "1",
	 *       buttonText: "Copy Code",
	 *       copyCode: "DISCOUNT50"
	 *     },
	 *     {
	 *       type: "call",
	 *       buttonId: "2", 
	 *       buttonText: "Call Us",
	 *       phoneNumber: "1234567890"
	 *     },
	 *     {
	 *       type: "url",
	 *       buttonId: "3",
	 *       buttonText: "Visit Website",
	 *       url: "https://example.com"
	 *     }
	 *   ]
	 * });
	 * ```
	 */
	async sendInteractiveButtons(message: SendInteractiveButtons): Promise<SendResponse> {
		return this.makeRequest("post", "sendInteractiveButtons", {
			chatId: message.chatId,
			header: message.header,
			body: message.body,
			footer: message.footer,
			buttons: message.buttons,
			quotedMessageId: message.quotedMessageId,
		});
	}

	/**
	 * Sends interactive reply buttons to a WhatsApp chat.
	 * These buttons return text to the chat when pressed.
	 *
	 * @param message - Interactive reply buttons message data
	 * @returns Promise resolving to send response
	 *
	 * @example
	 * ```typescript
	 * await client.sendInteractiveButtonsReply({
	 *   chatId: "1234567890@c.us",
	 *   header: "Survey",
	 *   body: "How satisfied are you with our service?",
	 *   footer: "Your feedback matters",
	 *   buttons: [
	 *     {
	 *       buttonId: "1",
	 *       buttonText: "Very Satisfied"
	 *     },
	 *     {
	 *       buttonId: "2", 
	 *       buttonText: "Satisfied"
	 *     },
	 *     {
	 *       buttonId: "3",
	 *       buttonText: "Needs Improvement"
	 *     }
	 *   ]
	 * });
	 * ```
	 */
	async sendInteractiveButtonsReply(message: SendInteractiveButtonsReply): Promise<SendResponse> {
		return this.makeRequest("post", "sendInteractiveButtonsReply", {
			chatId: message.chatId,
			header: message.header,
			body: message.body,
			footer: message.footer,
			buttons: message.buttons,
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
	async getAccountSettings(): Promise<AccountSettings> {
		return this.makeRequest("get", "getAccountSettings");
	}

	async getWaSettings(): Promise<WaSettings> {
		return this.makeRequest("get", "getWaSettings");
	}

	/**
	 * Sets the profile picture for the WhatsApp account.
	 *
	 * @param file - Image file (jpg) to use as profile picture
	 * @param fileName - File name with extension
	 * @returns Promise resolving to profile picture update response
	 */
	async setProfilePicture(file: Blob | File | Uint8Array, fileName?: string): Promise<SetProfilePicture> {
		return this.requestWithFile("setProfilePicture", {data: file, fileName: this.pictureFileName(file, fileName)});
	}

	/**
	 * Uploads a file to GREEN-API servers.
	 *
	 * @param file - File to upload
	 * @param fileName - File name with extension
	 * @returns Promise resolving to upload response with file URL
	 */
	async uploadFile(file: Blob | File | Uint8Array, fileName?: string): Promise<UploadFile> {
		const mimeType = file instanceof Blob ? file.type : "";
		const headers: Record<string, string> = {};
		if (mimeType) {
			headers["Content-Type"] = mimeType;
		} else if (fileName) {
			headers["GA-Filename"] = fileName;
		}
		const body = file instanceof Blob ? Buffer.from(await file.arrayBuffer()) : this.toBuffer(file);

		return this.makeRequest("post", "uploadFile", body, undefined, {headers}, undefined, "media");
	}

	/**
	 * Calls any GREEN-API method that takes a file.
	 *
	 * @param endpoint - GREEN-API method name, e.g. "setGroupPicture"
	 * @param file - File content and file name
	 * @param fields - Other form fields
	 * @returns Promise resolving to the raw response body
	 */
	async requestWithFile<T = unknown>(
		endpoint: string,
		file: { data: Blob | File | Uint8Array; fileName: string },
		fields: Record<string, string | number | boolean> = {},
	): Promise<T> {
		const formData = new FormData();
		formData.append("file", this.toBlob(file.data), file.fileName);
		for (const [key, value] of Object.entries(fields)) {
			formData.append(key, String(value));
		}
		return this.makeFileUploadRequest(endpoint, formData);
	}

	private pictureFileName(file: Blob | File | Uint8Array, fileName?: string): string {
		return fileName || (file instanceof File && file.name ? file.name : DEFAULT_PICTURE_FILE_NAME);
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
	 * Calls any GREEN-API method by name.
	 *
	 * @param method - HTTP method
	 * @param endpoint - GREEN-API method name, e.g. "getContacts"
	 * @param data - Request body for POST
	 * @param queryParams - Query parameters
	 * @returns Promise resolving to the raw response body
	 *
	 * @example
	 * ```typescript
	 * const contacts = await client.request("get", "getContacts");
	 * ```
	 */
	async request<T = unknown>(
		method: "get" | "post" | "delete",
		endpoint: string,
		data?: unknown,
		queryParams?: Record<string, string | number>,
	): Promise<T> {
		return this.makeRequest(method, endpoint, data, queryParams);
	}

	/**
	 * Receives the next notification from the instance queue.
	 *
	 * @param receiveTimeout - Seconds to wait for a notification, 5 to 60
	 * @returns Promise resolving to the notification, or null when the queue stayed empty
	 *
	 * @example
	 * ```typescript
	 * const notification = await client.receiveNotification(20);
	 * if (notification) {
	 *   await client.deleteNotification(notification.receiptId);
	 * }
	 * ```
	 */
	async receiveNotification(receiveTimeout?: number): Promise<ReceiveNotificationResponse | null> {
		const response = await this.makeRequest<ReceiveNotificationResponse | null | "">(
			"get",
			"receiveNotification",
			undefined,
			receiveTimeout === undefined ? undefined : {receiveTimeout},
		);
		return response || null;
	}

	/**
	 * Deletes a processed notification from the instance queue.
	 *
	 * @param receiptId - Receipt ID from receiveNotification
	 * @returns Promise resolving to deletion result
	 */
	async deleteNotification(receiptId: number): Promise<DeleteNotificationResponse> {
		return this.makeRequest("delete", "deleteNotification", undefined, undefined, undefined, receiptId.toString());
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
	 * Checks whether a messenger account exists for a phone number or username (Telegram, MAX).
	 *
	 * @param params - Phone number in international format, or a Telegram username starting with "@"
	 * @returns Promise resolving to the existence flag and, when the account exists, its chat id
	 * @throws {Error} If neither phoneNumber nor username is given
	 */
	async checkAccount(params: CheckAccount): Promise<CheckAccountResponse> {
		if (params.phoneNumber === undefined && !params.username) {
			throw new Error("Either phoneNumber or username is required");
		}
		if (params.phoneNumber !== undefined && !Number.isInteger(params.phoneNumber)) {
			throw new Error("Phone number must contain only digits");
		}
		return this.makeRequest("post", "checkAccount", params);
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
		return this.requestWithFile(
			"setGroupPicture",
			{data: params.file, fileName: this.pictureFileName(params.file, params.fileName)},
			{groupId: params.groupId},
		);
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

		/**
	 * The method is aimed for sending a text status
	 *
	 * @param status - Status data containing message, backgroundColor (optional), font (optional), participants (optional)
	 * @returns Promise resolving to send response with message ID
	 *
	 * @example
	 * ```typescript
	 * await client.sendTextStatus({
	 *   message: "I use Green-API to send this status!",
	 *   backgroundColor: "#228B22", // optional
	 *   font: "SERIF", // optional
	 *   participants: ["70000001234@c.us", "440000001234@c.us"] // optional
	 * });
	 * ```
	 */
	async sendTextStatus(status: SendTextStatus): Promise<SendResponse> {
		return this.makeRequest("post", "sendTextStatus", {
			message: status.message,
			backgroundColor: status.backgroundColor,
			font: status.font,
			participants: status.participants,
		});
	}

	/**
	 * The method is aimed for sending a voice status
	 *
	 * @param status - Status data containing urlFile, fileName, backgroundColor (optional), participants (optional)
	 * @returns Promise resolving to send response with message ID
	 *
	 * @example
	 * ```typescript
	 * await client.sendVoiceStatus({
	 *   urlFile: "https://my.site.com/img/horse.mp3",
	 *   fileName: "horse.mp3",
	 *   backgroundColor: "#228B22", // optional
	 *   participants: ["70000001234@c.us", "440000001234@c.us"] // optional
	 * });
	 * ```
	 */
	async sendVoiceStatus(status: SendVoiceStatus): Promise<SendResponse> {
		return this.makeRequest("post", "sendVoiceStatus", {
			urlFile: status.urlFile,
			fileName: status.fileName,
			backgroundColor: status.backgroundColor,
			participants: status.participants,
		});
	}

	/**
	 * The method is aimed for sending a pictures or video status
	 *
	 * @param status - Message data containing urlFile, fileName, backgroundColor (optional), participants (optional)
	 * @returns Promise resolving to send response with message ID
	 *
	 * @example
	 * ```typescript
	 * await client.sendVoiceStatus({
	 *   urlFile: "https://my.site.com/img/horse.png",
	 *   fileName: "horse.png",
	 *   caption: "Little horse",
	 *   participants: ["70000001234@c.us", "440000001234@c.us"] // optional
	 * });
	 * ```
	 */
	async sendMediaStatus(status: SendMediaStatus): Promise<SendResponse> {
		return this.makeRequest("post", "sendMediaStatus", {
			urlFile: status.urlFile,
			fileName: status.fileName,
			caption: status.caption,
			participants: status.participants,
		});
	}

	/**
	 * The method returns the incoming status messages of the instance. 
	 * In the default mode the incoming status messages for 24 hours are returned.
	 * Note: Requires "Receive webhooks" setting to be enabled.
	 * Messages can take up to 2 minutes to appear in history.
	 *
	 * @param minutes - Optional time period in minutes
	 * @returns Promise resolving to array of incoming statuses
	 */
	async getIncomingStatuses(minutes?: number): Promise<IncomingJournalResponse[]> {
		return this.makeRequest("get", "getIncomingStatuses", undefined, minutes ? {minutes} : undefined);
	}

	/**
	 * The method returns the outgoing statuses of the account.
	 * In the default mode the outgoing status messages for 24 hours are returned.
	 * Note: Requires "Receive webhooks" setting to be enabled.
	 * Messages can take up to 2 minutes to appear in history.
	 *
	 * @param minutes - Optional time period in minutes
	 * @returns Promise resolving to array of outgoing statuses
	 */
	async getOutgoingStatuses(minutes?: number): Promise<OutgoingJournalResponse[]> {
		return this.makeRequest("get", "getOutgoingStatuses", undefined, minutes ? {minutes} : undefined);
	}

	/**
	 * The method returns an array of recipients marked sent/delivered/read for a given status.
	 * Note: Requires "Receive webhooks" setting to be enabled.
	 * Messages can take up to 2 minutes to appear in history.
	 *
	 * @param idMessage - Status message ID
	 * @returns Promise resolving to array participant, timestamp, status
	 */
	async getStatusStatistic(idMessage?: string): Promise<GetStatusStatisticResponse[]> {
		return this.makeRequest("get", "getStatusStatistic", undefined, idMessage ? {idMessage} : undefined);
	}
}
