import { GreenApiClient } from "./green-api.client";
import { MessageTransformer } from "./message-transformer";
import { BaseUser, ForwardMessagesResponse, GreenApiWebhook, Instance, SendResponse, Settings } from "../types/types";
import { BadRequestError, IntegrationError, NotFoundError } from "./errors";
import { StorageProvider } from "./storage-provider";


/**
 * Base adapter for platform integrations with GREEN-API.
 * This class handles the core integration logic between your platform and GREEN-API's WhatsApp gateway.
 *
 * @category Core
 * @typeParam TPlatformWebhook - The webhook type specific to your platform
 * @typeParam TPlatformMessage - The message type specific to your platform
 * @typeParam TUser - User type extending BaseUser (default: BaseUser)
 * @typeParam TInstance - Instance type extending Instance (default: Instance)
 *
 * @example
 * ```typescript
 * class YourAdapter extends BaseAdapter<YourWebhook, YourMessage> {
 *   async createPlatformClient(config: YourConfig) {
 *     return new YourPlatformClient(config);
 *   }
 *
 *   async sendToPlatform(message: YourMessage, instance: Instance) {
 *     const client = await this.createPlatformClient(instance.config);
 *     await client.sendMessage(message);
 *   }
 * }
 * ```
 */
export abstract class BaseAdapter<TPlatformWebhook, TPlatformMessage, TUser extends BaseUser = BaseUser, TInstance extends Instance = Instance> {
	/**
	 * Creates an instance of BaseAdapter.
	 *
	 * @param transformer - Message transformer for converting between platform and GREEN-API formats
	 * @param storage - Storage provider for user and instance data
	 */
	public constructor(
		protected transformer: MessageTransformer<TPlatformWebhook, TPlatformMessage>,
		protected storage: StorageProvider<TUser, TInstance>,
	) {}

	/**
	 * Sends a message to your platform. This method must be implemented to define how
	 * messages are sent to your specific platform.
	 *
	 * @param message - The platform-specific message to send
	 * @param instance - The instance configuration for the current integration
	 * @returns Promise that resolves when the message is sent
	 *
	 * @example
	 * ```typescript
	 * async sendToPlatform(message: YourMessage, instance: Instance) {
	 *   const client = await this.createPlatformClient(instance.config);
	 *   await client.sendMessage({
	 *     recipient: message.to,
	 *     content: message.text
	 *   });
	 * }
	 * ```
	 */
	public abstract sendToPlatform(message: TPlatformMessage, instance: TInstance): Promise<void>;

	/**
	 * Creates a platform-specific client. This method must be implemented to define how
	 * to create a client for your platform's API.
	 *
	 * @param params - Configuration parameters for your platform's client
	 * @returns Promise resolving to your platform's client instance
	 *
	 * @example
	 * ```typescript
	 * async createPlatformClient(config: YourConfig) {
	 *   return new YourPlatformSDK({
	 *     apiKey: config.apiKey,
	 *     apiUrl: config.apiUrl
	 *   });
	 * }
	 * ```
	 */
	public abstract createPlatformClient(params: any): Promise<any>;

	/**
	 * Creates a GREEN-API client instance.
	 *
	 * @param instance - The instance configuration containing ID and token
	 * @returns GREEN-API client
	 */
	public createGreenApiClient(instance: Instance): GreenApiClient {
		return new GreenApiClient({
			idInstance: instance.idInstance,
			apiTokenInstance: instance.apiTokenInstance,
		});
	}

	/**
	 * Handles and wraps errors in IntegrationError.
	 *
	 * @param context - Error context description
	 * @param error - Original error
	 * @throws {IntegrationError} Always throws wrapped error
	 * @internal This method is used internally by the adapter
	 */
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

	/**
	 * Handles incoming webhooks from your platform and sends them to GREEN-API.
	 *
	 * @param message - The webhook message from your platform
	 * @param idInstance - The GREEN-API instance ID
	 * @returns Promise resolving to the send response
	 * @throws {IntegrationError} If instance is not found or message handling fails
	 */
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

	/**
	 * Handles incoming GREEN-API webhooks and forwards them to your platform.
	 *
	 * @param webhook - The webhook from GREEN-API
	 * @param allowedTypes - Array of webhook types to process, otherwise skipped
	 * @throws {NotFoundError} If instance is not found
	 * @throws {IntegrationError} If webhook handling fails
	 */
	public async handleGreenApiWebhook(webhook: GreenApiWebhook, allowedTypes: string[]): Promise<void> {
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

	/**
	 * Creates a new instance with specified settings.
	 *
	 * @param instance - The instance configuration
	 * @param settings - GREEN-API settings for the instance
	 * @param userCred - User credentials
	 * @returns Promise resolving to the created instance
	 * @throws {NotFoundError} If user is not found
	 * @throws {IntegrationError} If instance creation fails
	 */
	public async createInstance(instance: Instance, settings: Settings, userCred: any): Promise<TInstance> {
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

	/**
	 * Removes an instance by ID.
	 *
	 * @param idInstance - The instance ID to remove
	 * @returns Promise resolving to the removed instance
	 * @throws {NotFoundError} If instance is not found
	 */
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

	/**
	 * Retrieves an instance by ID.
	 *
	 * @param idInstance - The instance ID to retrieve
	 * @returns Promise resolving to the instance or null if not found
	 * @throws {IntegrationError} If retrieval fails
	 */
	public async getInstance(idInstance: number | bigint): Promise<TInstance | null> {
		try {
			return this.storage.getInstance(idInstance);
		} catch (error) {
			this.handleError("Failed to remove instance", error);
		}
	}

	/**
	 * Updates user information.
	 *
	 * @param userCred - User credentials
	 * @param userUpdateData - New user data
	 * @returns Promise resolving to success status
	 * @throws {IntegrationError} If update fails
	 */
	public async updateUser(userCred: any, userUpdateData: any) {
		try {
			return this.storage.updateUser(userCred, userUpdateData);
		} catch (error) {
			this.handleError(`Failed to update user ${userCred}`, error);
		}
	}

	/**
	 * Creates a new user in the storage.
	 * This method is implemented in the base adapter but can be overridden if needed.
	 *
	 * @param userCred - User credentials
	 * @param data - User data
	 * @throws {BadRequestError} If user already exists
	 * @throws {IntegrationError} If creation fails
	 */
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
