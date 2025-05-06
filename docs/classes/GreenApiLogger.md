[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / GreenApiLogger

# Class: GreenApiLogger

Defined in: [src/core/logger.ts:42](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/logger.ts#L42)

Logger for GREEN-API integration library.
Provides structured JSON logging with colored output and error handling.
Uses singleton pattern to maintain consistent logging instances across the application.

## Example

```typescript
const logger = GreenApiLogger.getInstance("MyComponent");

// Basic logging
logger.info("Operation successful", { userId: 123 });

// Error logging
try {
  // ... some code
} catch (error) {
  logger.logErrorResponse(error, "Failed to process request");
}
```

## Methods

### debug()

> **debug**(`message`, `context`): `void`

Defined in: [src/core/logger.ts:148](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/logger.ts#L148)

Logs a debug message

#### Parameters

##### message

`string`

Debug message

##### context

`Record`\<`string`, `any`\> = `{}`

Additional context data

#### Returns

`void`

***

### error()

> **error**(`message`, `context`): `void`

Defined in: [src/core/logger.ts:175](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/logger.ts#L175)

Logs an error message

#### Parameters

##### message

`string`

Error message

##### context

`Record`\<`string`, `any`\> = `{}`

Additional context data

#### Returns

`void`

***

### fatal()

> **fatal**(`message`, `context`): `void`

Defined in: [src/core/logger.ts:202](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/logger.ts#L202)

Logs a fatal error message

#### Parameters

##### message

`string`

Fatal error message

##### context

`Record`\<`string`, `any`\> = `{}`

Additional context data

#### Returns

`void`

***

### info()

> **info**(`message`, `context`): `void`

Defined in: [src/core/logger.ts:157](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/logger.ts#L157)

Logs an info message

#### Parameters

##### message

`string`

Info message

##### context

`Record`\<`string`, `any`\> = `{}`

Additional context data

#### Returns

`void`

***

### log()

> **log**(`message`, `context`?): `void`

Defined in: [src/core/logger.ts:184](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/logger.ts#L184)

Alternative method for logging info messages

#### Parameters

##### message

`string`

Log message

##### context?

`string`

Context string

#### Returns

`void`

***

### logErrorResponse()

> **logErrorResponse**(`error`, `context`, `additionalContext`): `void`

Defined in: [src/core/logger.ts:223](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/logger.ts#L223)

Logs detailed error information, handling both Axios errors and regular errors.
Particularly useful for API errors and exceptions.

#### Parameters

##### error

`any`

Error object (Axios error or regular error)

##### context

`string`

Error context description

##### additionalContext

`Record`\<`string`, `any`\> = `{}`

Additional context data

#### Returns

`void`

#### Example

```typescript
try {
  await api.request();
} catch (error) {
  logger.logErrorResponse(error, "API Request failed", { requestId: "123" });
}
```

***

### verbose()

> **verbose**(`message`, `context`?): `void`

Defined in: [src/core/logger.ts:193](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/logger.ts#L193)

Logs a verbose debug message

#### Parameters

##### message

`string`

Debug message

##### context?

`string`

Context string

#### Returns

`void`

***

### warn()

> **warn**(`message`, `context`): `void`

Defined in: [src/core/logger.ts:166](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/logger.ts#L166)

Logs a warning message

#### Parameters

##### message

`string`

Warning message

##### context

`Record`\<`string`, `any`\> = `{}`

Additional context data

#### Returns

`void`

***

### getInstance()

> `static` **getInstance**(`context`): [`GreenApiLogger`](GreenApiLogger.md)

Defined in: [src/core/logger.ts:72](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/logger.ts#L72)

Gets a logger instance for the specified context.
Creates a new instance if one doesn't exist, otherwise returns existing instance.

#### Parameters

##### context

`string` = `"Global"`

The context for the logger (default: "Global")

#### Returns

[`GreenApiLogger`](GreenApiLogger.md)

Logger instance for the specified context

#### Example

```typescript
const logger = GreenApiLogger.getInstance("MyService");
```
