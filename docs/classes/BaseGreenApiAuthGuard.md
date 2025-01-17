[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / BaseGreenApiAuthGuard

# Class: `abstract` BaseGreenApiAuthGuard\<T\>

Defined in: [src/core/guard.ts:34](https://github.com/green-api/greenapi-integration/blob/20ab1c18eae4ff2cd48cede03d005dd7127abc0b/src/core/guard.ts#L34)

Base authentication guard for validating incoming GREEN-API webhooks.
Ensures that webhooks are authenticated and come from valid instances.

## Example

```typescript
class WebhookGuard extends BaseGreenApiAuthGuard<ExpressRequest> {
  constructor(storage: StorageProvider) {
    super(storage);
  }
}

// Usage in Express
app.post('/webhook', async (req, res) => {
  const guard = new WebhookGuard(storage);
  try {
    await guard.validateRequest(req);
    // Process webhook
  } catch (error) {
    if (error instanceof AuthenticationError) {
      res.status(401).json({ error: error.message });
    }
  }
});
```

## Type Parameters

• **T** *extends* [`BaseRequest`](../interfaces/BaseRequest.md) = [`BaseRequest`](../interfaces/BaseRequest.md)

Request type extending BaseRequest, contains headers and body

## Constructors

### new BaseGreenApiAuthGuard()

> **new BaseGreenApiAuthGuard**\<`T`\>(`storage`): [`BaseGreenApiAuthGuard`](BaseGreenApiAuthGuard.md)\<`T`\>

Defined in: [src/core/guard.ts:40](https://github.com/green-api/greenapi-integration/blob/20ab1c18eae4ff2cd48cede03d005dd7127abc0b/src/core/guard.ts#L40)

Creates an instance of BaseGreenApiAuthGuard.

#### Parameters

##### storage

[`StorageProvider`](StorageProvider.md)

Storage provider for accessing instance data

#### Returns

[`BaseGreenApiAuthGuard`](BaseGreenApiAuthGuard.md)\<`T`\>

## Properties

### storage

> `protected` **storage**: [`StorageProvider`](StorageProvider.md)

Defined in: [src/core/guard.ts:40](https://github.com/green-api/greenapi-integration/blob/20ab1c18eae4ff2cd48cede03d005dd7127abc0b/src/core/guard.ts#L40)

Storage provider for accessing instance data

## Methods

### validateRequest()

> **validateRequest**(`request`): `Promise`\<`boolean`\>

Defined in: [src/core/guard.ts:53](https://github.com/green-api/greenapi-integration/blob/20ab1c18eae4ff2cd48cede03d005dd7127abc0b/src/core/guard.ts#L53)

Validates an incoming webhook request.
Checks for presence of authorization token and validates it against instance settings.

#### Parameters

##### request

`T`

The incoming request with headers and body

#### Returns

`Promise`\<`boolean`\>

Promise resolving to true if validation succeeds

#### Throws

If authorization header is missing

#### Throws

If webhook format is invalid

#### Throws

If instance is not found

#### Throws

If token is invalid
