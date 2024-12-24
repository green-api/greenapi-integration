import { BaseRequest } from "../types/types";
import { StorageProvider } from "./storage-provider";
import { AuthenticationError } from "./errors";

export abstract class BaseGreenApiAuthGuard<T extends BaseRequest = BaseRequest> {
	constructor(protected storage: StorageProvider) {}

	async validateRequest(request: T): Promise<boolean> {
		const token = request.headers["authorization"];
		if (!token) {
			throw new AuthenticationError("Authentication header is missing");
		}

		const idInstance = request.body?.instanceData?.idInstance;
		if (!idInstance) {
			throw new AuthenticationError("Invalid webhook format");
		}

		const instance = await this.storage.getInstance(idInstance);
		if (!instance) {
			throw new AuthenticationError("No instance with such ID");
		}

		if (instance.settings?.webhookUrlToken !== token.split(" ")[1]) {
			throw new AuthenticationError("Invalid token");
		}

		return true;
	}
}
