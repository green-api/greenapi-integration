/**
 * Base error class for all integration-related errors.
 *
 * @category Errors
 *
 * @example
 * ```typescript
 * throw new IntegrationError(
 *   "Failed to process webhook",
 *   "PROCESSING_ERROR",
 *   500,
 *   { webhookId: "123" }
 * );
 * ```
 */
export class IntegrationError extends Error {
	/**
	 * Creates an integration error.
	 *
	 * @param message - Human-readable error message
	 * @param code - Error code for programmatic handling
	 * @param statusCode - HTTP status code (default: 500)
	 * @param details - Additional error details or context
	 */
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

/**
 * Error thrown when request validation fails or request data is invalid.
 *
 * @category Errors
 *
 * @example
 * ```typescript
 * if (!instanceId) {
 *   throw new BadRequestError("Instance ID is required");
 * }
 * ```
 */
export class BadRequestError extends IntegrationError {
	/**
	 * Creates a bad request error.
	 *
	 * @param message - Human-readable error message
	 * @param details - Additional error details or context
	 */
	constructor(message: string, details?: unknown) {
		super(message, "VALIDATION_ERROR", 400, details);
	}
}

/**
 * Error thrown when authentication fails or credentials are invalid.
 *
 * @category Errors
 *
 * @example
 * ```typescript
 * if (!token) {
 *   throw new AuthenticationError("Authentication token is missing");
 * }
 * ```
 */
export class AuthenticationError extends IntegrationError {
	/**
	 * Creates an authentication error.
	 *
	 * @param message - Human-readable error message
	 */
	constructor(message: string) {
		super(message, "AUTHENTICATION_ERROR", 401);
	}
}

/**
 * Error thrown when a requested resource is not found.
 *
 * @category Errors
 *
 * @example
 * ```typescript
 * if (!instance) {
 *   throw new NotFoundError("No instance with such ID");
 * }
 * ```
 */
export class NotFoundError extends IntegrationError {
	/**
	 * Creates a not found error.
	 *
	 * @param message - Human-readable error message
	 */
	constructor(message: string) {
		super(message, "NOT_FOUND_ERROR", 404);
	}
}
