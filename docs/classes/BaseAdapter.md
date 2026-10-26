[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / BaseAdapter

# Abstract Class: BaseAdapter\<TPlatformWebhook, TPlatformMessage, TUser, TInstance\>

Defined in: [src/core/base-adapter.ts:41](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/base-adapter.ts#L41)

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

### TPlatformWebhook

`TPlatformWebhook`

The webhook type specific to your platform

### TPlatformMessage

`TPlatformMessage`

The message type specific to your platform

### TUser

`TUser` *extends* [`BaseUser`](../interfaces/BaseUser.md) = [`BaseUser`](../interfaces/BaseUser.md)

User type extending BaseUser (default: BaseUser)

### TInstance

`TInstance` *extends* [`Instance`](../interfaces/Instance.md) = [`Instance`](../interfaces/Instance.md)

Instance type extending Instance (default: Instance)

## Constructors

### Constructor

> `protected` **new BaseAdapter**\<`TPlatformWebhook`, `TPlatformMessage`, `TUser`, `TInstance`\>(`transformer`, `storage`): `BaseAdapter`\<`TPlatformWebhook`, `TPlatformMessage`, `TUser`, `TInstance`\>

Defined in: [src/core/base-adapter.ts:50](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/base-adapter.ts#L50)

Creates an instance of BaseAdapter.

#### Parameters

##### transformer

[`MessageTransformer`](MessageTransformer.md)\<`TPlatformWebhook`, `TPlatformMessage`\>

Message transformer for converting between platform and GREEN-API formats

##### storage

[`StorageProvider`](StorageProvider.md)\<`TUser`, `TInstance`\>

Storage provider for user and instance data

#### Returns

`BaseAdapter`\<`TPlatformWebhook`, `TPlatformMessage`, `TUser`, `TInstance`\>

## Properties

### gaLogger

> `protected` `readonly` **gaLogger**: [`GreenApiLogger`](GreenApiLogger.md)

Defined in: [src/core/base-adapter.ts:42](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/base-adapter.ts#L42)

***

### storage

> `protected` **storage**: [`StorageProvider`](StorageProvider.md)\<`TUser`, `TInstance`\>

Defined in: [src/core/base-adapter.ts:52](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/base-adapter.ts#L52)

Storage provider for user and instance data

***

### transformer

> `protected` **transformer**: [`MessageTransformer`](MessageTransformer.md)\<`TPlatformWebhook`, `TPlatformMessage`\>

Defined in: [src/core/base-adapter.ts:51](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/base-adapter.ts#L51)

Message transformer for converting between platform and GREEN-API formats

## Methods

### createGreenApiClient()

> **createGreenApiClient**(`instance`): [`GreenApiClient`](GreenApiClient.md)

Defined in: [src/core/base-adapter.ts:113](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/base-adapter.ts#L113)

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

> **createInstance**(`instance`): `Promise`\<`TInstance`\>

Defined in: [src/core/base-adapter.ts:230](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/base-adapter.ts#L230)

Creates a new instance with specified settings.

#### Parameters

##### instance

[`Instance`](../interfaces/Instance.md)

The instance configuration

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

Defined in: [src/core/base-adapter.ts:93](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/base-adapter.ts#L93)

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

Defined in: [src/core/base-adapter.ts:303](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/base-adapter.ts#L303)

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

***

### getInstance()

> **getInstance**(`idInstance`): `Promise`\<`TInstance` \| `null`\>

Defined in: [src/core/base-adapter.ts:272](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/base-adapter.ts#L272)

Retrieves an instance by ID.

#### Parameters

##### idInstance

`number` \| `bigint`

The instance ID to retrieve

#### Returns

`Promise`\<`TInstance` \| `null`\>

Promise resolving to the instance or null if not found

#### Throws

If retrieval fails

***

### handleGreenApiWebhook()

> **handleGreenApiWebhook**(`webhook`, `allowedTypes`): `Promise`\<`void`\>

Defined in: [src/core/base-adapter.ts:197](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/base-adapter.ts#L197)

Handles incoming GREEN-API webhooks and forwards them to your platform.

#### Parameters

##### webhook

[`GreenApiWebhook`](../type-aliases/GreenApiWebhook.md)

The webhook from GREEN-API

##### allowedTypes

[`WebhookType`](../type-aliases/WebhookType.md)[]

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

Defined in: [src/core/base-adapter.ts:152](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/base-adapter.ts#L152)

Handles incoming webhooks from your platform and sends them to GREEN-API.

#### Parameters

##### message

`TPlatformWebhook`

The webhook message from your platform

##### idInstance

`number` \| `bigint`

The GREEN-API instance ID

#### Returns

`Promise`\<[`ForwardMessagesResponse`](../interfaces/ForwardMessagesResponse.md) \| [`SendResponse`](../interfaces/SendResponse.md)\>

Promise resolving to the send response

#### Throws

If instance is not found or message handling fails

***

### handleStateInstanceWebhook()

> **handleStateInstanceWebhook**(`webhook`): `Promise`\<`void`\>

Defined in: [src/core/base-adapter.ts:102](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/base-adapter.ts#L102)

Handles instance state change webhooks from GREEN-API.
Adapters MUST override this method if they need to handle instance state changes

#### Parameters

##### webhook

[`StateInstanceWebhook`](../interfaces/StateInstanceWebhook.md)

The state change webhook from GREEN-API

#### Returns

`Promise`\<`void`\>

Promise resolving when the webhook is handled

***

### removeInstance()

> **removeInstance**(`idInstance`): `Promise`\<`TInstance`\>

Defined in: [src/core/base-adapter.ts:257](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/base-adapter.ts#L257)

Removes an instance by ID.

#### Parameters

##### idInstance

`number` \| `bigint`

The instance ID to remove

#### Returns

`Promise`\<`TInstance`\>

Promise resolving to the removed instance

#### Throws

If instance is not found

***

### sendToPlatform()

> `abstract` **sendToPlatform**(`message`, `instance`): `Promise`\<`void`\>

Defined in: [src/core/base-adapter.ts:74](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/base-adapter.ts#L74)

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

Defined in: [src/core/base-adapter.ts:288](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/base-adapter.ts#L288)

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
