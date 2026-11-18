[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / BaseCallsAdapter

# Abstract Class: BaseCallsAdapter\<TPlatformCommand, TUser, TInstance\>

Defined in: [src/core/base-calls-adapter.ts:34](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/core/base-calls-adapter.ts#L34)

Base adapter for calls integrations with GREEN-API.
Implement toCallCommand and sendCallEventToPlatform for your platform.

## Example

```typescript
class YourCallsAdapter extends BaseCallsAdapter<YourCallRequest> {
  toCallCommand(request: YourCallRequest): CallCommand {
    return request.type === "call"
      ? {action: "dial", chatId: formatPhoneNumber(request.phone)}
      : {action: request.type};
  }

  async sendCallEventToPlatform(event: CallEvent, instance: Instance) {
    await yourPlatform.logCall(event.callId, event.chatId, event.description);
  }
}
```

## Type Parameters

### TPlatformCommand

`TPlatformCommand`

The call request type specific to your platform

### TUser

`TUser` *extends* [`BaseUser`](../interfaces/BaseUser.md) = [`BaseUser`](../interfaces/BaseUser.md)

User type extending BaseUser (default: BaseUser)

### TInstance

`TInstance` *extends* [`Instance`](../interfaces/Instance.md) = [`Instance`](../interfaces/Instance.md)

Instance type extending Instance (default: Instance)

## Constructors

### Constructor

> `protected` **new BaseCallsAdapter**\<`TPlatformCommand`, `TUser`, `TInstance`\>(`storage`): `BaseCallsAdapter`\<`TPlatformCommand`, `TUser`, `TInstance`\>

Defined in: [src/core/base-calls-adapter.ts:42](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/core/base-calls-adapter.ts#L42)

Creates an instance of BaseCallsAdapter.

#### Parameters

##### storage

[`StorageProvider`](StorageProvider.md)\<`TUser`, `TInstance`\>

Storage provider for user and instance data

#### Returns

`BaseCallsAdapter`\<`TPlatformCommand`, `TUser`, `TInstance`\>

## Properties

### gaLogger

> `protected` `readonly` **gaLogger**: [`GreenApiLogger`](GreenApiLogger.md)

Defined in: [src/core/base-calls-adapter.ts:35](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/core/base-calls-adapter.ts#L35)

***

### storage

> `protected` **storage**: [`StorageProvider`](StorageProvider.md)\<`TUser`, `TInstance`\>

Defined in: [src/core/base-calls-adapter.ts:42](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/core/base-calls-adapter.ts#L42)

Storage provider for user and instance data

## Methods

### createCallVoice()

> **createCallVoice**(`instance`, `options?`): [`CallVoice`](CallVoice.md)

Defined in: [src/core/base-calls-adapter.ts:83](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/core/base-calls-adapter.ts#L83)

Creates the voice of a call for a program that plays and receives audio.

#### Parameters

##### instance

[`Instance`](../interfaces/Instance.md)

The instance that makes or answers the call

##### options?

[`CallVoiceOptions`](../interfaces/CallVoiceOptions.md)

Path to ffmpeg and the sample rate of live PCM audio

#### Returns

[`CallVoice`](CallVoice.md)

Call voice, not yet open

***

### createGreenApiClient()

> **createGreenApiClient**(`instance`): [`GreenApiClient`](GreenApiClient.md)

Defined in: [src/core/base-calls-adapter.ts:67](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/core/base-calls-adapter.ts#L67)

Creates a GREEN-API client instance.

#### Parameters

##### instance

[`Instance`](../interfaces/Instance.md)

The instance configuration containing ID and token

#### Returns

[`GreenApiClient`](GreenApiClient.md)

GREEN-API client

***

### handleGreenApiWebhook()

> **handleGreenApiWebhook**(`webhook`): `Promise`\<`void`\>

Defined in: [src/core/base-calls-adapter.ts:110](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/core/base-calls-adapter.ts#L110)

Handles incomingCall and outgoingCall webhooks from GREEN-API and forwards them to your platform.

#### Parameters

##### webhook

[`GreenApiWebhook`](../type-aliases/GreenApiWebhook.md)

The webhook from GREEN-API

#### Returns

`Promise`\<`void`\>

Promise that resolves when the event is delivered or the webhook is skipped

#### Throws

If instance is not found

***

### handlePlatformCommand()

> **handlePlatformCommand**(`command`, `idInstance`): `Promise`\<[`CallIdResponse`](../interfaces/CallIdResponse.md)\>

Defined in: [src/core/base-calls-adapter.ts:96](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/core/base-calls-adapter.ts#L96)

Runs a call request from your platform.

#### Parameters

##### command

`TPlatformCommand`

The call request from your platform

##### idInstance

`number` \| `bigint`

The GREEN-API instance ID

#### Returns

`Promise`\<[`CallIdResponse`](../interfaces/CallIdResponse.md)\>

Promise resolving to the call ID

#### Throws

If instance is not found

#### Throws

If GREEN-API refuses the command

***

### sendCallEventToPlatform()

> `abstract` **sendCallEventToPlatform**(`event`, `instance`): `Promise`\<`void`\>

Defined in: [src/core/base-calls-adapter.ts:59](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/core/base-calls-adapter.ts#L59)

Sends a call event to your platform.

#### Parameters

##### event

[`CallEvent`](../interfaces/CallEvent.md)

The call event

##### instance

`TInstance`

The instance the call belongs to

#### Returns

`Promise`\<`void`\>

Promise that resolves when the event is delivered

***

### toCallCommand()

> `abstract` **toCallCommand**(`command`): [`CallCommand`](../type-aliases/CallCommand.md)

Defined in: [src/core/base-calls-adapter.ts:50](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/core/base-calls-adapter.ts#L50)

Converts a call request from your platform into a call command.

#### Parameters

##### command

`TPlatformCommand`

The call request from your platform

#### Returns

[`CallCommand`](../type-aliases/CallCommand.md)

The call command
