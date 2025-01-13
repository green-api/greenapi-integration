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
	WaSettings, UploadFile, SendLocation, SendContact, ForwardMessages, ForwardMessagesResponse,
} from "../types/types";

/**
 * Client for direct interaction with GREEN-API's WhatsApp gateway.
 * Provides methods for sending messages, managing instances, and handling files.
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
		config?: any,
	): Promise<T> {
		try {
			const response: AxiosResponse<T> = await (method === "get"
				? this.client.get(this.buildEndpoint(endpoint), config)
				: this.client.post(this.buildEndpoint(endpoint), data, config));
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
}
