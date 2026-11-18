import { BaseUser, CallCommand, CallEvent, CallIdResponse, GreenApiWebhook, Instance } from "../types/types";
import { GreenApiClient } from "./green-api.client";
import { StorageProvider } from "./storage-provider";
import { GreenApiLogger } from "./logger";
import { NotFoundError } from "./errors";
import { isCallWebhook, toCallEvent } from "./call-events";
import { runCallCommand } from "./call-commands";
import { CallVoice, CallVoiceOptions } from "../voice/call-voice";

/**
 * Base adapter for calls integrations with GREEN-API.
 * Implement toCallCommand and sendCallEventToPlatform for your platform.
 *
 * @category Calls
 * @typeParam TPlatformCommand - The call request type specific to your platform
 * @typeParam TUser - User type extending BaseUser (default: BaseUser)
 * @typeParam TInstance - Instance type extending Instance (default: Instance)
 *
 * @example
 * ```typescript
 * class YourCallsAdapter extends BaseCallsAdapter<YourCallRequest> {
 *   toCallCommand(request: YourCallRequest): CallCommand {
 *     return request.type === "call"
 *       ? {action: "dial", chatId: formatPhoneNumber(request.phone)}
 *       : {action: request.type};
 *   }
 *
 *   async sendCallEventToPlatform(event: CallEvent, instance: Instance) {
 *     await yourPlatform.logCall(event.callId, event.chatId, event.description);
 *   }
 * }
 * ```
 */
export abstract class BaseCallsAdapter<TPlatformCommand, TUser extends BaseUser = BaseUser, TInstance extends Instance = Instance> {
	protected readonly gaLogger = GreenApiLogger.getInstance(this.constructor.name);

	/**
	 * Creates an instance of BaseCallsAdapter.
	 *
	 * @param storage - Storage provider for user and instance data
	 */
	protected constructor(protected storage: StorageProvider<TUser, TInstance>) {}

	/**
	 * Converts a call request from your platform into a call command.
	 *
	 * @param command - The call request from your platform
	 * @returns The call command
	 */
	public abstract toCallCommand(command: TPlatformCommand): CallCommand;

	/**
	 * Sends a call event to your platform.
	 *
	 * @param event - The call event
	 * @param instance - The instance the call belongs to
	 * @returns Promise that resolves when the event is delivered
	 */
	public abstract sendCallEventToPlatform(event: CallEvent, instance: TInstance): Promise<void>;

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
			apiUrl: instance.apiUrl,
			mediaUrl: instance.mediaUrl,
		});
	}

	/**
	 * Creates the voice of a call for a program that plays and receives audio.
	 *
	 * @param instance - The instance that makes or answers the call
	 * @param options - Path to ffmpeg and the sample rate of live PCM audio
	 * @returns Call voice, not yet open
	 */
	public createCallVoice(instance: Instance, options?: CallVoiceOptions): CallVoice {
		return new CallVoice(this.createGreenApiClient(instance), options);
	}

	/**
	 * Runs a call request from your platform.
	 *
	 * @param command - The call request from your platform
	 * @param idInstance - The GREEN-API instance ID
	 * @returns Promise resolving to the call ID
	 * @throws {NotFoundError} If instance is not found
	 * @throws {CallError} If GREEN-API refuses the command
	 */
	public async handlePlatformCommand(command: TPlatformCommand, idInstance: number | bigint): Promise<CallIdResponse> {
		const instance = await this.requireInstance(idInstance);
		const callCommand = this.toCallCommand(command);
		this.gaLogger.info("Handling call command", {idInstance, action: callCommand.action});
		return runCallCommand(this.createGreenApiClient(instance), callCommand);
	}

	/**
	 * Handles incomingCall and outgoingCall webhooks from GREEN-API and forwards them to your platform.
	 *
	 * @param webhook - The webhook from GREEN-API
	 * @returns Promise that resolves when the event is delivered or the webhook is skipped
	 * @throws {NotFoundError} If instance is not found
	 */
	public async handleGreenApiWebhook(webhook: GreenApiWebhook): Promise<void> {
		if (!isCallWebhook(webhook)) {
			this.gaLogger.warn(`Skipping GREEN-API webhook because ${webhook.typeWebhook} is not a call webhook`, {webhook});
			return;
		}
		this.gaLogger.info("Handling call webhook", {webhook});
		const instance = await this.requireInstance(webhook.instanceData.idInstance);
		await this.sendCallEventToPlatform(toCallEvent(webhook), instance);
	}

	private async requireInstance(idInstance: number | bigint): Promise<TInstance> {
		const instance = await this.storage.getInstance(idInstance);
		if (!instance) {
			throw new NotFoundError("Instance not found");
		}
		return instance;
	}
}
