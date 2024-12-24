import { GreenApiClient } from "./green-api.client";
import { MessageTransformer } from "./message-transformer";
import {
	BaseInstance,
	BaseUser, ForwardMessagesResponse,
	IncomingGreenApiWebhook,
	Instance, SendResponse,
	Settings,
} from "../types/types";
import { BadRequestError, IntegrationError, NotFoundError } from "./errors";
import { StorageProvider } from "./storage-provider";

export abstract class BaseAdapter<TPlatformWebhook, TPlatformMessage, TUser extends BaseUser = BaseUser, TInstance extends BaseInstance = Instance> {
	public constructor(
		protected transformer: MessageTransformer<TPlatformWebhook, TPlatformMessage>,
		protected storage: StorageProvider<TUser, TInstance>,
	) {}

	public abstract sendToPlatform(message: TPlatformMessage, instance: TInstance): Promise<void>;

	public createGreenApiClient(instance: BaseInstance): GreenApiClient {
		return new GreenApiClient({
			idInstance: instance.idInstance,
			apiTokenInstance: instance.apiTokenInstance,
		});
	}

	private handleError(context: string, error: unknown): never {
		if (error instanceof IntegrationError) {
			throw error;
		}

		const errorMessage = error instanceof Error ? error.message : String(error);
		throw new IntegrationError(
			`${context}: ${errorMessage}`,
			"UNEXPECTED_ERROR",
			500,
			{originalError: error},
		);
	}

	public abstract createPlatformClient(params: any): Promise<any>;

	public async handlePlatformWebhook(message: TPlatformWebhook, idInstance: number | bigint): Promise<SendResponse | ForwardMessagesResponse> {
		try {
			const instance = await this.storage.getInstance(idInstance);
			if (!instance) {
				throw new IntegrationError("Instance not found", "INSTANCE_NOT_FOUND", 404);
			}
			const client = this.createGreenApiClient(instance);
			const transformedMessage = this.transformer.toGreenApiMessage(message);

			switch (transformedMessage.type) {
				case "url-file":
					return client.sendFileByUrl(transformedMessage);
				case "upload-file":
					return client.sendFileByUpload(transformedMessage);
				case "text":
					return client.sendMessage(transformedMessage);
				case "poll":
					return client.sendPoll(transformedMessage);
				case "contact":
					return client.sendContact(transformedMessage);
				case "location":
					return client.sendLocation(transformedMessage);
				case "forward":
					return client.forwardMessages(transformedMessage);
				default:
					throw new Error("Invalid file message format");
			}
		} catch (error) {
			this.handleError("Failed to handle incoming message", error);
		}
	}

	public async handleGreenApiWebhook(webhook: IncomingGreenApiWebhook, allowedTypes: string[]): Promise<void> {
		if (!allowedTypes.includes(webhook.typeWebhook)) {
			return;
		}
		try {
			const transformedMessage = await this.transformer.toPlatformMessage(webhook);
			const instance = await this.storage.getInstance(webhook.instanceData.idInstance);
			if (!instance) {
				throw new NotFoundError("Instance not found");
			}

			await this.sendToPlatform(transformedMessage, instance);
		} catch (error) {
			this.handleError("Failed to handle GREEN-API webhook", error);
		}
	}

	public async createInstance(instance: Instance, settings: Settings, userCred: any): Promise<TInstance> {
		console.log(instance, settings, userCred);
		try {
			const user = await this.storage.findUser(userCred);
			if (!user) {
				throw new NotFoundError("No user with such credentials");
			}
			const client = this.createGreenApiClient(instance);

			try {
				await client.getSettings();
			} catch (error: any) {
				throw new IntegrationError(`Failed to get settings for instance ${instance.idInstance}: ${error.message}`, "INTEGRATION_ERROR");
			}
			const createdInstance = await this.storage.createInstance(instance, user.id, settings);

			await client.setSettings(settings);
			return createdInstance;
		} catch (error) {
			this.handleError("Failed to add instance", error);
		}
	}

	public async removeInstance(idInstance: number | bigint): Promise<TInstance> {
		try {
			const instance = await this.storage.getInstance(idInstance);
			if (!instance) {
				throw new NotFoundError("No instance with such ID");
			}
			return this.storage.removeInstance(idInstance);
		} catch (error) {
			this.handleError("Failed to remove instance", error);
		}
	}

	public async getInstance(idInstance: number | bigint): Promise<TInstance | null> {
		try {
			return this.storage.getInstance(idInstance);
		} catch (error) {
			this.handleError("Failed to remove instance", error);
		}
	}

	public async updateUser(userCred: any, userUpdateData: any) {
		try {
			await this.storage.updateUser(userCred, userUpdateData);
			return {status: "ok", message: "Token updated successfully"};
		} catch (error) {
			this.handleError(`Failed to update user ${userCred}`, error);
		}
	}

	public async createUser(userCred: any, data: any) {
		const existingUser = await this.storage.findUser(userCred);
		if (existingUser) {
			throw new BadRequestError("User already created");
		}
		try {
			return this.storage.createUser(data);
		} catch (error) {
			this.handleError(`Failed to create user ${userCred}`, error);
		}
	}
}
