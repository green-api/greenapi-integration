import { BaseRequest } from "../types/types";
import { StorageProvider } from "./storage-provider";
import { AuthenticationError } from "./errors";
import { GreenApiLogger } from "./logger";

/**
 * Base authentication guard for validating incoming GREEN-API webhooks.
 * Ensures that webhooks are authenticated and come from valid instances.
 *
 * @category Authentication
 * @typeParam T - Request type extending BaseRequest, contains headers and body
 *
 * @example
 * ```typescript
 * class WebhookGuard extends BaseGreenApiAuthGuard<ExpressRequest> {
 *   constructor(storage: StorageProvider) {
 *     super(storage);
 *   }
 * }
 *
 * // Usage in Express
 * app.post('/webhook', async (req, res) => {
 *   const guard = new WebhookGuard(storage);
 *   try {
 *     await guard.validateRequest(req);
 *     // Process webhook
 *   } catch (error) {
 *     if (error instanceof AuthenticationError) {
 *       res.status(401).json({ error: error.message });
 *     }
 *   }
 * });
 * ```
 */
export abstract class BaseGreenApiAuthGuard<T extends BaseRequest = BaseRequest> {
	private readonly gaLogger = GreenApiLogger.getInstance(this.constructor.name);

	/**
	 * Creates an instance of BaseGreenApiAuthGuard.
	 *
	 * @param storage - Storage provider for accessing instance data
	 */
	protected constructor(protected storage: StorageProvider) {}

	/**
	 * Validates an incoming webhook request.
	 * Checks for presence of authorization token and validates it against instance settings.
	 *
	 * @param request - The incoming request with headers and body
	 * @returns Promise resolving to true if validation succeeds
	 * @throws {AuthenticationError} If authorization header is missing
	 * @throws {AuthenticationError} If webhook format is invalid
	 * @throws {AuthenticationError} If instance is not found
	 * @throws {AuthenticationError} If token is invalid
	 */
	async validateRequest(request: T): Promise<boolean> {
		const token = request.headers["authorization"];
		if (!token) {
			throw new AuthenticationError("Authentication header is missing");
		}
		this.gaLogger.info("Request from GREEN-API", {body: request.body});
		const idInstance = request.body?.instanceData?.idInstance;
		if (!idInstance) {
			throw new AuthenticationError("Invalid webhook format");
		}

		const instance = await this.storage.getInstance(idInstance);
		if (!instance) {
			throw new AuthenticationError(`No instance with such ID ${idInstance}`);
		}

		if (instance.settings?.webhookUrlToken !== token.split(" ")[1]) {
			throw new AuthenticationError("Invalid token");
		}

		return true;
	}
}
