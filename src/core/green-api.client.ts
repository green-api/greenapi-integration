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

export class GreenApiClient {
	private client: AxiosInstance;
	private readonly baseUrl = "https://api.green-api.com";

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
			throw new Error(`Failed to ${endpoint.replace(/([A-Z])/g, " $1").toLowerCase()}: ${error.message}`);
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

	async sendMessage(message: SendMessage): Promise<SendResponse> {
		return this.makeRequest("post", "sendMessage", {
			chatId: message.chatId,
			message: message.message,
			quotedMessageId: message.quotedMessageId,
		});
	}

	async sendFileByUrl(message: SendFileByUrl): Promise<SendResponse> {
		return this.makeRequest("post", "sendFileByUrl", {
			chatId: message.chatId,
			urlFile: message.file.url,
			fileName: message.file.fileName,
			caption: message.caption,
			quotedMessageId: message.quotedMessageId,
		});
	}

	async sendFileByUpload(message: SendFileByUpload): Promise<SendFileByUploadResponse> {
		const formData = new FormData();
		formData.append("file", message.file.data);
		formData.append("chatId", message.chatId);
		formData.append("fileName", message.file.fileName);
		if (message.caption) formData.append("caption", message.caption);
		if (message.quotedMessageId) formData.append("quotedMessageId", message.quotedMessageId);

		return this.makeFileUploadRequest("sendFileByUpload", formData);
	}

	async sendPoll(message: SendPoll): Promise<SendResponse> {
		return this.makeRequest("post", "sendPoll", {
			chatId: message.chatId,
			message: message.message,
			options: message.options,
			multipleAnswers: message.multipleAnswers,
			quotedMessageId: message.quotedMessageId,
		});
	}

	async forwardMessages(request: ForwardMessages): Promise<ForwardMessagesResponse> {
		return this.makeRequest("post", "forwardMessages", {
			chatId: request.chatId,
			chatIdFrom: request.chatIdFrom,
			messages: request.messages,
		});
	}

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

	async sendContact(message: SendContact): Promise<SendResponse> {
		return this.makeRequest("post", "sendContact", {
			chatId: message.chatId,
			contact: message.contact,
			quotedMessageId: message.quotedMessageId,
		});
	}

	async reboot(): Promise<Reboot> {
		return this.makeRequest("get", "reboot");
	}

	async logout(): Promise<Logout> {
		return this.makeRequest("get", "logout");
	}

	async getStateInstance(): Promise<StateInstance> {
		return this.makeRequest("get", "getStateInstance");
	}

	async getQR(): Promise<QR> {
		return this.makeRequest("get", "qr");
	}

	async getSettings(): Promise<Settings> {
		return this.makeRequest("get", "getSettings");
	}

	async setSettings(settings: Settings): Promise<SetSettingsResponse> {
		return this.makeRequest("post", "setSettings", settings);
	}

	async getWaSettings(): Promise<WaSettings> {
		return this.makeRequest("get", "getWaSettings");
	}

	async setProfilePicture(file: Blob | File): Promise<SetProfilePicture> {
		const formData = new FormData();
		formData.append("file", file);
		return this.makeFileUploadRequest("setProfilePicture", formData);
	}

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

	async getAuthorizationCode(phoneNumber: number): Promise<GetAuthorizationCode> {
		if (!Number.isInteger(phoneNumber)) {
			throw new Error("Phone number must contain only digits");
		}
		return this.makeRequest("post", "getAuthorizationCode", {phoneNumber});
	}
}
