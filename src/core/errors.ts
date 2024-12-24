export class IntegrationError extends Error {
	constructor(
		message: string,
		public readonly code: string,
		public readonly statusCode: number = 500,
		public readonly details?: unknown,
	) {
		super(message);
		this.name = "IntegrationError";
	}
}

export class BadRequestError extends IntegrationError {
	constructor(message: string, details?: unknown) {
		super(message, "VALIDATION_ERROR", 400, details);
	}
}

export class AuthenticationError extends IntegrationError {
	constructor(message: string) {
		super(message, "AUTHENTICATION_ERROR", 401);
	}
}

export class NotFoundError extends IntegrationError {
	constructor(message: string) {
		super(message, "NOT_FOUND_ERROR", 404);
	}
}
