[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / AuthenticationError

# Class: AuthenticationError

Defined in: [src/core/errors.ts:72](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/errors.ts#L72)

Error thrown when authentication fails or credentials are invalid.

## Example

```typescript
if (!token) {
  throw new AuthenticationError("Authentication token is missing");
}
```

## Extends

- [`IntegrationError`](IntegrationError.md)

## Constructors

### new AuthenticationError()

> **new AuthenticationError**(`message`): [`AuthenticationError`](AuthenticationError.md)

Defined in: [src/core/errors.ts:78](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/errors.ts#L78)

Creates an authentication error.

#### Parameters

##### message

`string`

Human-readable error message

#### Returns

[`AuthenticationError`](AuthenticationError.md)

#### Overrides

[`IntegrationError`](IntegrationError.md).[`constructor`](IntegrationError.md#constructors)

## Properties

### code

> `readonly` **code**: `string`

Defined in: [src/core/errors.ts:27](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/errors.ts#L27)

Error code for programmatic handling

#### Inherited from

[`IntegrationError`](IntegrationError.md).[`code`](IntegrationError.md#code-1)

***

### details?

> `readonly` `optional` **details**: `unknown`

Defined in: [src/core/errors.ts:29](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/errors.ts#L29)

Additional error details or context

#### Inherited from

[`IntegrationError`](IntegrationError.md).[`details`](IntegrationError.md#details-1)

***

### message

> **message**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

[`IntegrationError`](IntegrationError.md).[`message`](IntegrationError.md#message-1)

***

### name

> **name**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

[`IntegrationError`](IntegrationError.md).[`name`](IntegrationError.md#name)

***

### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

[`IntegrationError`](IntegrationError.md).[`stack`](IntegrationError.md#stack)

***

### statusCode

> `readonly` **statusCode**: `number` = `500`

Defined in: [src/core/errors.ts:28](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/core/errors.ts#L28)

HTTP status code (default: 500)

#### Inherited from

[`IntegrationError`](IntegrationError.md).[`statusCode`](IntegrationError.md#statuscode-1)

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

[`IntegrationError`](IntegrationError.md).[`prepareStackTrace`](IntegrationError.md#preparestacktrace)

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/@types/node/globals.d.ts:145

#### Inherited from

[`IntegrationError`](IntegrationError.md).[`stackTraceLimit`](IntegrationError.md#stacktracelimit)

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

[`IntegrationError`](IntegrationError.md).[`captureStackTrace`](IntegrationError.md#capturestacktrace)
