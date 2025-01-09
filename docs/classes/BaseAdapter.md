[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / BaseAdapter

# Class: `abstract` BaseAdapter\<TPlatformWebhook, TPlatformMessage, TUser, TInstance\>

Defined in: [src/core/base-adapter.ts:32](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/base-adapter.ts#L32)

Base adapter for platform integrations with GREEN-API.
This class handles the core integration logic between your platform and GREEN-API's WhatsApp gateway.

## Example

```typescript
class YourAdapter extends BaseAdapter<YourWebhook, YourMessage> {
  async createPlatformClient(config: YourConfig) {
    return new YourPlatformClient(config);
  }

  async sendToPlatform(message: YourMessage, instance: Instance) {
    const client = await this.createPlatformClient(instance.config);
    await client.sendMessage(message);
  }
}
```

## Type Parameters

• **TPlatformWebhook**

The webhook type specific to your platform

• **TPlatformMessage**

The message type specific to your platform

• **TUser** *extends* [`BaseUser`](../interfaces/BaseUser.md) = [`BaseUser`](../interfaces/BaseUser.md)

User type extending BaseUser (default: BaseUser)

• **TInstance** *extends* [`Instance`](../interfaces/Instance.md) = [`Instance`](../interfaces/Instance.md)

Instance type extending Instance (default: Instance)

## Constructors

### new BaseAdapter()

> **new BaseAdapter**\<`TPlatformWebhook`, `TPlatformMessage`, `TUser`, `TInstance`\>(`transformer`, `storage`): [`BaseAdapter`](BaseAdapter.md)\<`TPlatformWebhook`, `TPlatformMessage`, `TUser`, `TInstance`\>

Defined in: [src/core/base-adapter.ts:39](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/base-adapter.ts#L39)

Creates an instance of BaseAdapter.

#### Parameters

##### transformer

[`MessageTransformer`](MessageTransformer.md)\<`TPlatformWebhook`, `TPlatformMessage`\>

Message transformer for converting between platform and GREEN-API formats

##### storage

[`StorageProvider`](StorageProvider.md)\<`TUser`, `TInstance`\>

Storage provider for user and instance data

#### Returns

[`BaseAdapter`](BaseAdapter.md)\<`TPlatformWebhook`, `TPlatformMessage`, `TUser`, `TInstance`\>

## Properties

### storage

> `protected` **storage**: [`StorageProvider`](StorageProvider.md)\<`TUser`, `TInstance`\>

Defined in: [src/core/base-adapter.ts:41](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/base-adapter.ts#L41)

Storage provider for user and instance data

***

### transformer

> `protected` **transformer**: [`MessageTransformer`](MessageTransformer.md)\<`TPlatformWebhook`, `TPlatformMessage`\>

Defined in: [src/core/base-adapter.ts:40](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/base-adapter.ts#L40)

Message transformer for converting between platform and GREEN-API formats

## Methods

### createGreenApiClient()

> **createGreenApiClient**(`instance`): [`GreenApiClient`](GreenApiClient.md)

Defined in: [src/core/base-adapter.ts:90](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/base-adapter.ts#L90)

Creates a GREEN-API client instance.

#### Parameters

##### instance

[`Instance`](../interfaces/Instance.md)

The instance configuration containing ID and token

#### Returns

[`GreenApiClient`](GreenApiClient.md)

GREEN-API client

***

### createInstance()

> **createInstance**(`instance`, `settings`, `userCred`): `Promise`\<`TInstance`\>

Defined in: [src/core/base-adapter.ts:194](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/base-adapter.ts#L194)

Creates a new instance with specified settings.

#### Parameters

##### instance

[`Instance`](../interfaces/Instance.md)

The instance configuration

##### settings

[`Settings`](../interfaces/Settings.md)

GREEN-API settings for the instance

##### userCred

`any`

User credentials

#### Returns

`Promise`\<`TInstance`\>

Promise resolving to the created instance

#### Throws

If user is not found

#### Throws

If instance creation fails

***

### createPlatformClient()

> `abstract` **createPlatformClient**(`params`): `Promise`\<`any`\>

Defined in: [src/core/base-adapter.ts:82](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/base-adapter.ts#L82)

Creates a platform-specific client. This method must be implemented to define how
to create a client for your platform's API.

#### Parameters

##### params

`any`

Configuration parameters for your platform's client

#### Returns

`Promise`\<`any`\>

Promise resolving to your platform's client instance

#### Example

```typescript
async createPlatformClient(config: YourConfig) {
  return new YourPlatformSDK({
    apiKey: config.apiKey,
    apiUrl: config.apiUrl
  });
}
```

***

### createUser()

> **createUser**(`userCred`, `data`): `Promise`\<`TUser`\>

Defined in: [src/core/base-adapter.ts:275](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/base-adapter.ts#L275)

Creates a new user in the storage.
This method is implemented in the base adapter but can be overridden if needed.

#### Parameters

##### userCred

`any`

User credentials

##### data

`any`

User data

#### Returns

`Promise`\<`TUser`\>

#### Throws

If user already exists

#### Throws

If creation fails

***

### getInstance()

> **getInstance**(`idInstance`): `Promise`\<`null` \| `TInstance`\>

Defined in: [src/core/base-adapter.ts:242](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/base-adapter.ts#L242)

Retrieves an instance by ID.

#### Parameters

##### idInstance

The instance ID to retrieve

`number` | `bigint`

#### Returns

`Promise`\<`null` \| `TInstance`\>

Promise resolving to the instance or null if not found

#### Throws

If retrieval fails

***

### handleGreenApiWebhook()

> **handleGreenApiWebhook**(`webhook`, `allowedTypes`): `Promise`\<`void`\>

Defined in: [src/core/base-adapter.ts:167](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/base-adapter.ts#L167)

Handles incoming GREEN-API webhooks and forwards them to your platform.

#### Parameters

##### webhook

[`GreenApiWebhook`](../type-aliases/GreenApiWebhook.md)

The webhook from GREEN-API

##### allowedTypes

`string`[]

Array of webhook types to process, otherwise skipped

#### Returns

`Promise`\<`void`\>

#### Throws

If instance is not found

#### Throws

If webhook handling fails

***

### handlePlatformWebhook()

> **handlePlatformWebhook**(`message`, `idInstance`): `Promise`\<[`ForwardMessagesResponse`](../interfaces/ForwardMessagesResponse.md) \| [`SendResponse`](../interfaces/SendResponse.md)\>

Defined in: [src/core/base-adapter.ts:127](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/base-adapter.ts#L127)

Handles incoming webhooks from your platform and sends them to GREEN-API.

#### Parameters

##### message

`TPlatformWebhook`

The webhook message from your platform

##### idInstance

The GREEN-API instance ID

`number` | `bigint`

#### Returns

`Promise`\<[`ForwardMessagesResponse`](../interfaces/ForwardMessagesResponse.md) \| [`SendResponse`](../interfaces/SendResponse.md)\>

Promise resolving to the send response

#### Throws

If instance is not found or message handling fails

***

### removeInstance()

> **removeInstance**(`idInstance`): `Promise`\<`TInstance`\>

Defined in: [src/core/base-adapter.ts:223](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/base-adapter.ts#L223)

Removes an instance by ID.

#### Parameters

##### idInstance

The instance ID to remove

`number` | `bigint`

#### Returns

`Promise`\<`TInstance`\>

Promise resolving to the removed instance

#### Throws

If instance is not found

***

### sendToPlatform()

> `abstract` **sendToPlatform**(`message`, `instance`): `Promise`\<`void`\>

Defined in: [src/core/base-adapter.ts:63](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/base-adapter.ts#L63)

Sends a message to your platform. This method must be implemented to define how
messages are sent to your specific platform.

#### Parameters

##### message

`TPlatformMessage`

The platform-specific message to send

##### instance

`TInstance`

The instance configuration for the current integration

#### Returns

`Promise`\<`void`\>

Promise that resolves when the message is sent

#### Example

```typescript
async sendToPlatform(message: YourMessage, instance: Instance) {
  const client = await this.createPlatformClient(instance.config);
  await client.sendMessage({
    recipient: message.to,
    content: message.text
  });
}
```

***

### updateUser()

> **updateUser**(`userCred`, `userUpdateData`): `Promise`\<`TUser`\>

Defined in: [src/core/base-adapter.ts:258](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/base-adapter.ts#L258)

Updates user information.

#### Parameters

##### userCred

`any`

User credentials

##### userUpdateData

`any`

New user data

#### Returns

`Promise`\<`TUser`\>

Promise resolving to success status

#### Throws

If update fails
