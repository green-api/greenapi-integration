[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / GreenApiClient

# Class: GreenApiClient

Defined in: [src/core/green-api.client.ts:40](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/green-api.client.ts#L40)

Client for direct interaction with GREEN-API's WhatsApp gateway.
Provides methods for sending messages, managing instances, and handling files.

## Example

```typescript
const client = new GreenApiClient({
  idInstance: 12345,
  apiTokenInstance: "your-token"
});

await client.sendMessage({
  chatId: "1234567890@c.us",
  message: "Hello from GREEN-API!"
});
```

## Constructors

### new GreenApiClient()

> **new GreenApiClient**(`instance`): [`GreenApiClient`](GreenApiClient.md)

Defined in: [src/core/green-api.client.ts:49](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/green-api.client.ts#L49)

Creates a GREEN-API client instance.

#### Parameters

##### instance

[`Instance`](../interfaces/Instance.md)

Configuration containing idInstance and apiTokenInstance

#### Returns

[`GreenApiClient`](GreenApiClient.md)

## Methods

### forwardMessages()

> **forwardMessages**(`request`): `Promise`\<[`ForwardMessagesResponse`](../interfaces/ForwardMessagesResponse.md)\>

Defined in: [src/core/green-api.client.ts:207](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/green-api.client.ts#L207)

Forwards messages from one chat to another.

#### Parameters

##### request

Forward request with source and target chat IDs

###### chatId

`string`

###### chatIdFrom

`string`

###### messages

`string`[]

###### type

`"forward"`

#### Returns

`Promise`\<[`ForwardMessagesResponse`](../interfaces/ForwardMessagesResponse.md)\>

Promise resolving to forward response

***

### getAuthorizationCode()

> **getAuthorizationCode**(`phoneNumber`): `Promise`\<[`GetAuthorizationCode`](../interfaces/GetAuthorizationCode.md)\>

Defined in: [src/core/green-api.client.ts:379](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/green-api.client.ts#L379)

Gets authorization code for a phone number.

#### Parameters

##### phoneNumber

`number`

Phone number to get code for

#### Returns

`Promise`\<[`GetAuthorizationCode`](../interfaces/GetAuthorizationCode.md)\>

Promise resolving to authorization code response

#### Throws

If phone number is not an integer

***

### getQR()

> **getQR**(): `Promise`\<[`QR`](../interfaces/QR.md)\>

Defined in: [src/core/green-api.client.ts:301](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/green-api.client.ts#L301)

Gets the QR code for GREEN-API instance authentication.

#### Returns

`Promise`\<[`QR`](../interfaces/QR.md)\>

Promise resolving to QR code data

***

### getSettings()

> **getSettings**(): `Promise`\<[`Settings`](../interfaces/Settings.md)\>

Defined in: [src/core/green-api.client.ts:310](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/green-api.client.ts#L310)

Gets current instance settings.

#### Returns

`Promise`\<[`Settings`](../interfaces/Settings.md)\>

Promise resolving to settings object

***

### getStateInstance()

> **getStateInstance**(): `Promise`\<[`StateInstance`](../interfaces/StateInstance.md)\>

Defined in: [src/core/green-api.client.ts:292](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/green-api.client.ts#L292)

Gets the current state of the GREEN-API instance.

#### Returns

`Promise`\<[`StateInstance`](../interfaces/StateInstance.md)\>

Promise resolving to instance state

***

### getWaSettings()

> **getWaSettings**(): `Promise`\<[`WaSettings`](../interfaces/WaSettings.md)\>

Defined in: [src/core/green-api.client.ts:329](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/green-api.client.ts#L329)

Gets WhatsApp-specific settings.

#### Returns

`Promise`\<[`WaSettings`](../interfaces/WaSettings.md)\>

Promise resolving to WhatsApp settings

***

### logout()

> **logout**(): `Promise`\<[`Logout`](../interfaces/Logout.md)\>

Defined in: [src/core/green-api.client.ts:283](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/green-api.client.ts#L283)

Logs out from the GREEN-API instance.

#### Returns

`Promise`\<[`Logout`](../interfaces/Logout.md)\>

Promise resolving to logout status

***

### reboot()

> **reboot**(): `Promise`\<[`Reboot`](../interfaces/Reboot.md)\>

Defined in: [src/core/green-api.client.ts:274](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/green-api.client.ts#L274)

Reboots the GREEN-API instance.

#### Returns

`Promise`\<[`Reboot`](../interfaces/Reboot.md)\>

Promise resolving to reboot status

***

### sendContact()

> **sendContact**(`message`): `Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Defined in: [src/core/green-api.client.ts:261](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/green-api.client.ts#L261)

Sends a contact card to a WhatsApp chat.

#### Parameters

##### message

`object` & [`BaseMessage`](../interfaces/BaseMessage.md)

Contact data

#### Returns

`Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Promise resolving to send response

#### Example

```typescript
await client.sendContact({
  chatId: "1234567890@c.us",
  contact: {
    phoneContact: 1234567890,
    firstName: "John",
    lastName: "Doe"
  }
});
```

***

### sendFileByUpload()

> **sendFileByUpload**(`message`): `Promise`\<[`SendFileByUploadResponse`](../interfaces/SendFileByUploadResponse.md)\>

Defined in: [src/core/green-api.client.ts:164](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/green-api.client.ts#L164)

Sends a file from local data to a WhatsApp chat.

#### Parameters

##### message

`object` & [`BaseMessage`](../interfaces/BaseMessage.md)

Message data containing chat ID and file data

#### Returns

`Promise`\<[`SendFileByUploadResponse`](../interfaces/SendFileByUploadResponse.md)\>

Promise resolving to send response with file URL

#### Example

```typescript
await client.sendFileByUpload({
  chatId: "1234567890@c.us",
  file: {
    data: fileBlob,
    fileName: "image.jpg"
  },
  caption: "Check this image"
});
```

***

### sendFileByUrl()

> **sendFileByUrl**(`message`): `Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Defined in: [src/core/green-api.client.ts:136](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/green-api.client.ts#L136)

Sends a file from a URL to a WhatsApp chat.

#### Parameters

##### message

`object` & [`BaseMessage`](../interfaces/BaseMessage.md)

Message data containing chat ID and file URL

#### Returns

`Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Promise resolving to send response

#### Example

```typescript
await client.sendFileByUrl({
  chatId: "1234567890@c.us",
  file: {
    url: "https://example.com/file.pdf",
    fileName: "document.pdf"
  },
  caption: "Check this file" // Optional
});
```

***

### sendLocation()

> **sendLocation**(`message`): `Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Defined in: [src/core/green-api.client.ts:232](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/green-api.client.ts#L232)

Sends a location to a WhatsApp chat.

#### Parameters

##### message

`object` & [`BaseMessage`](../interfaces/BaseMessage.md)

Location data with coordinates

#### Returns

`Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Promise resolving to send response

#### Example

```typescript
await client.sendLocation({
  chatId: "1234567890@c.us",
  latitude: 51.5074,
  longitude: -0.1278,
  nameLocation: "London",
  address: "London, UK"
});
```

***

### sendMessage()

> **sendMessage**(`message`): `Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Defined in: [src/core/green-api.client.ts:110](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/green-api.client.ts#L110)

Sends a text message to a WhatsApp chat.

#### Parameters

##### message

`object` & [`BaseMessage`](../interfaces/BaseMessage.md)

Message data containing chat ID and text

#### Returns

`Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Promise resolving to send response with message ID

#### Example

```typescript
await client.sendMessage({
  chatId: "1234567890@c.us",
  message: "Hello!",
  quotedMessageId: "12345" // Optional: reply to a message
});
```

***

### sendPoll()

> **sendPoll**(`message`): `Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Defined in: [src/core/green-api.client.ts:191](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/green-api.client.ts#L191)

Creates a poll in a WhatsApp chat.

#### Parameters

##### message

`object` & [`BaseMessage`](../interfaces/BaseMessage.md)

Poll data with question and options

#### Returns

`Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Promise resolving to send response

#### Example

```typescript
await client.sendPoll({
  chatId: "1234567890@c.us",
  message: "What's your favorite color?",
  options: ["Red", "Blue", "Green"],
  multipleAnswers: false
});
```

***

### setProfilePicture()

> **setProfilePicture**(`file`): `Promise`\<[`SetProfilePicture`](../interfaces/SetProfilePicture.md)\>

Defined in: [src/core/green-api.client.ts:339](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/green-api.client.ts#L339)

Sets the profile picture for the WhatsApp account.

#### Parameters

##### file

Image file to use as profile picture

`Blob` | `File`

#### Returns

`Promise`\<[`SetProfilePicture`](../interfaces/SetProfilePicture.md)\>

Promise resolving to profile picture update response

***

### setSettings()

> **setSettings**(`settings`): `Promise`\<[`SetSettingsResponse`](../interfaces/SetSettingsResponse.md)\>

Defined in: [src/core/green-api.client.ts:320](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/green-api.client.ts#L320)

Updates instance settings.

#### Parameters

##### settings

[`Settings`](../interfaces/Settings.md)

New settings to apply

#### Returns

`Promise`\<[`SetSettingsResponse`](../interfaces/SetSettingsResponse.md)\>

Promise resolving to settings update response

***

### uploadFile()

> **uploadFile**(`file`, `customFileName`?): `Promise`\<[`UploadFile`](../interfaces/UploadFile.md)\>

Defined in: [src/core/green-api.client.ts:352](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/green-api.client.ts#L352)

Uploads a file to GREEN-API servers.

#### Parameters

##### file

File to upload

`Blob` | `File`

##### customFileName?

`string`

Optional custom name for the file

#### Returns

`Promise`\<[`UploadFile`](../interfaces/UploadFile.md)\>

Promise resolving to upload response with file URL
