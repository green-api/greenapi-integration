[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / IntegrationError

# Class: IntegrationError

Defined in: [src/core/errors.ts:16](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/errors.ts#L16)

Base error class for all integration-related errors.

## Example

```typescript
throw new IntegrationError(
  "Failed to process webhook",
  "PROCESSING_ERROR",
  500,
  { webhookId: "123" }
);
```

## Extends

- `Error`

## Extended by

- [`BadRequestError`](BadRequestError.md)
- [`AuthenticationError`](AuthenticationError.md)
- [`NotFoundError`](NotFoundError.md)

## Constructors

### new IntegrationError()

> **new IntegrationError**(`message`, `code`, `statusCode`, `details`?): [`IntegrationError`](IntegrationError.md)

Defined in: [src/core/errors.ts:25](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/errors.ts#L25)

Creates an integration error.

#### Parameters

##### message

`string`

Human-readable error message

##### code

`string`

Error code for programmatic handling

##### statusCode

`number` = `500`

HTTP status code (default: 500)

##### details?

`unknown`

Additional error details or context

#### Returns

[`IntegrationError`](IntegrationError.md)

#### Overrides

`Error.constructor`

## Properties

### code

> `readonly` **code**: `string`

Defined in: [src/core/errors.ts:27](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/errors.ts#L27)

Error code for programmatic handling

***

### details?

> `readonly` `optional` **details**: `unknown`

Defined in: [src/core/errors.ts:29](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/errors.ts#L29)

Additional error details or context

***

### message

> **message**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

`Error.message`

***

### name

> **name**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

`Error.name`

***

### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`Error.stack`

***

### statusCode

> `readonly` **statusCode**: `number` = `500`

Defined in: [src/core/errors.ts:28](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/errors.ts#L28)

HTTP status code (default: 500)

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/@types/node/globals.d.ts:143

Optional override for formatting stack traces

#### Parameters

##### err

`Error`

##### stackTraces

`CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/@types/node/globals.d.ts:145

#### Inherited from

`Error.stackTraceLimit`

## Methods

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Defined in: node\_modules/@types/node/globals.d.ts:136

Create .stack property on a target object

#### Parameters

##### targetObject

`object`

##### constructorOpt?

`Function`

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`
