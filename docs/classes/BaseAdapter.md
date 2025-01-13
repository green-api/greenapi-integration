[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / BaseAdapter

# Class: `abstract` BaseAdapter\<TPlatformWebhook, TPlatformMessage, TUser, TInstance\>

Defined in: [src/core/base-adapter.ts:40](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/core/base-adapter.ts#L40)

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

Defined in: [src/core/base-adapter.ts:47](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/core/base-adapter.ts#L47)

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

Defined in: [src/core/base-adapter.ts:49](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/core/base-adapter.ts#L49)

Storage provider for user and instance data

***

### transformer

> `protected` **transformer**: [`MessageTransformer`](MessageTransformer.md)\<`TPlatformWebhook`, `TPlatformMessage`\>

Defined in: [src/core/base-adapter.ts:48](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/core/base-adapter.ts#L48)

Message transformer for converting between platform and GREEN-API formats

## Methods

### createGreenApiClient()

> **createGreenApiClient**(`instance`): [`GreenApiClient`](GreenApiClient.md)

Defined in: [src/core/base-adapter.ts:110](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/core/base-adapter.ts#L110)

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

> **createInstance**(`instance`, `userCred`): `Promise`\<`TInstance`\>

Defined in: [src/core/base-adapter.ts:216](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/core/base-adapter.ts#L216)

Creates a new instance with specified settings.

#### Parameters

##### instance

[`Instance`](../interfaces/Instance.md)

The instance configuration

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

Defined in: [src/core/base-adapter.ts:90](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/core/base-adapter.ts#L90)

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

Defined in: [src/core/base-adapter.ts:299](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/core/base-adapter.ts#L299)

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

Defined in: [src/core/base-adapter.ts:266](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/core/base-adapter.ts#L266)

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

Defined in: [src/core/base-adapter.ts:187](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/core/base-adapter.ts#L187)

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

Defined in: [src/core/base-adapter.ts:147](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/core/base-adapter.ts#L147)

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

### handleStateInstanceWebhook()

> **handleStateInstanceWebhook**(`webhook`): `Promise`\<`void`\>

Defined in: [src/core/base-adapter.ts:99](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/core/base-adapter.ts#L99)

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

Defined in: [src/core/base-adapter.ts:247](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/core/base-adapter.ts#L247)

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

Defined in: [src/core/base-adapter.ts:71](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/core/base-adapter.ts#L71)

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

Defined in: [src/core/base-adapter.ts:282](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/core/base-adapter.ts#L282)

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
