[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / NotFoundError

# Class: NotFoundError

Defined in: [src/core/errors.ts:95](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/core/errors.ts#L95)

Error thrown when a requested resource is not found.

## Example

```typescript
if (!instance) {
  throw new NotFoundError("No instance with such ID");
}
```

## Extends

- [`IntegrationError`](IntegrationError.md)

## Constructors

### new NotFoundError()

> **new NotFoundError**(`message`): [`NotFoundError`](NotFoundError.md)

Defined in: [src/core/errors.ts:101](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/core/errors.ts#L101)

Creates a not found error.

#### Parameters

##### message

`string`

Human-readable error message

#### Returns

[`NotFoundError`](NotFoundError.md)

#### Overrides

[`IntegrationError`](IntegrationError.md).[`constructor`](IntegrationError.md#constructors)

## Properties

### code

> `readonly` **code**: `string`

Defined in: [src/core/errors.ts:27](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/core/errors.ts#L27)

Error code for programmatic handling

#### Inherited from

[`IntegrationError`](IntegrationError.md).[`code`](IntegrationError.md#code-1)

***

### details?

> `readonly` `optional` **details**: `unknown`

Defined in: [src/core/errors.ts:29](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/core/errors.ts#L29)

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

Defined in: [src/core/errors.ts:28](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/core/errors.ts#L28)

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
