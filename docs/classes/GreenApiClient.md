[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / GreenApiClient

# Class: GreenApiClient

Defined in: [src/core/green-api.client.ts:84](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L84)

Client for direct interaction with GREEN-API's WhatsApp gateway.
Provides methods for sending messages, managing instances, and handling files.
For more information about the methods, refer to https://green-api.com/en/docs

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

Defined in: [src/core/green-api.client.ts:94](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L94)

Creates a GREEN-API client instance.

#### Parameters

##### instance

[`Instance`](../interfaces/Instance.md)

Configuration containing idInstance and apiTokenInstance

#### Returns

[`GreenApiClient`](GreenApiClient.md)

## Methods

### addGroupParticipant()

> **addGroupParticipant**(`params`): `Promise`\<[`AddGroupParticipantResponse`](../interfaces/AddGroupParticipantResponse.md)\>

Defined in: [src/core/green-api.client.ts:639](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L639)

Adds a participant to a group chat.
Note: Only group administrators can add members.
The participant's number should be saved in the phonebook for reliable addition.

#### Parameters

##### params

[`AddGroupParticipant`](../interfaces/AddGroupParticipant.md)

Parameters containing group ID and participant ID

#### Returns

`Promise`\<[`AddGroupParticipantResponse`](../interfaces/AddGroupParticipantResponse.md)\>

Promise resolving to addition status

***

### archiveChat()

> **archiveChat**(`params`): `Promise`\<`void`\>

Defined in: [src/core/green-api.client.ts:574](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L574)

Archives a chat. Chat must have at least one incoming message.
Note: "Receive webhooks on incoming messages and files" setting must be enabled.

#### Parameters

##### params

[`ArchiveChat`](../interfaces/ArchiveChat.md)

Parameters containing the chat ID to archive

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

***

### checkWhatsapp()

> **checkWhatsapp**(`params`): `Promise`\<[`CheckWhatsappResponse`](../interfaces/CheckWhatsappResponse.md)\>

Defined in: [src/core/green-api.client.ts:524](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L524)

Checks WhatsApp account availability on a phone number.

#### Parameters

##### params

[`CheckWhatsapp`](../interfaces/CheckWhatsapp.md)

Parameters containing the phone number to check

#### Returns

`Promise`\<[`CheckWhatsappResponse`](../interfaces/CheckWhatsappResponse.md)\>

Promise resolving to WhatsApp availability status

#### Throws

If phone number is not an integer or not 11-12 digits

#### Example

```typescript
const result = await client.checkWhatsapp({
  phoneNumber: 11001234567
});

if (result.existsWhatsapp) {
  console.log('WhatsApp account exists');
}
```

***

### clearMessagesQueue()

> **clearMessagesQueue**(): `Promise`\<[`ClearMessagesQueue`](../interfaces/ClearMessagesQueue.md)\>

Defined in: [src/core/green-api.client.ts:476](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L476)

Clears the queue of messages waiting to be sent.
Important when switching phone numbers to prevent sending queued messages with the new number.

#### Returns

`Promise`\<[`ClearMessagesQueue`](../interfaces/ClearMessagesQueue.md)\>

Promise resolving to queue clearing status

#### Example

```typescript
const result = await client.clearMessagesQueue();
if (result.isCleared) {
  console.log('Queue successfully cleared');
}
```

***

### createGroup()

> **createGroup**(`params`): `Promise`\<[`CreateGroupResponse`](../interfaces/CreateGroupResponse.md)\>

Defined in: [src/core/green-api.client.ts:606](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L606)

Creates a group chat.
Note: Limited to creating 1 group per 5 minutes to simulate human behavior.

#### Parameters

##### params

[`CreateGroup`](../interfaces/CreateGroup.md)

Parameters containing group name and participant IDs

#### Returns

`Promise`\<[`CreateGroupResponse`](../interfaces/CreateGroupResponse.md)\>

Promise resolving to group creation result

***

### forwardMessages()

> **forwardMessages**(`request`): `Promise`\<[`ForwardMessagesResponse`](../interfaces/ForwardMessagesResponse.md)\>

Defined in: [src/core/green-api.client.ts:266](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L266)

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

Defined in: [src/core/green-api.client.ts:438](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L438)

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

### getAvatar()

> **getAvatar**(`params`): `Promise`\<[`GetAvatarResponse`](../interfaces/GetAvatarResponse.md)\>

Defined in: [src/core/green-api.client.ts:541](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L541)

Gets a user or group chat avatar.

#### Parameters

##### params

[`GetAvatar`](../interfaces/GetAvatar.md)

Parameters containing the chat ID

#### Returns

`Promise`\<[`GetAvatarResponse`](../interfaces/GetAvatarResponse.md)\>

Promise resolving to avatar information

***

### getChatHistory()

> **getChatHistory**(`params`): `Promise`\<([`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| `never` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| `never`)[]\>

Defined in: [src/core/green-api.client.ts:718](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L718)

Gets chat message history.
Note: Requires "Receive webhooks" setting to be enabled.
Messages can take up to 2 minutes to appear in history.

#### Parameters

##### params

[`GetChatHistory`](../interfaces/GetChatHistory.md)

Parameters containing chat ID and optional message count

#### Returns

`Promise`\<([`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| `never` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| `never`)[]\>

Promise resolving to array of messages

***

### getContactInfo()

> **getContactInfo**(`params`): `Promise`\<[`ContactInfo`](../interfaces/ContactInfo.md)\>

Defined in: [src/core/green-api.client.ts:563](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L563)

Gets detailed information about a contact.
Note: This method does not support group chats, use getGroupData for groups.

#### Parameters

##### params

[`GetAvatar`](../interfaces/GetAvatar.md)

Parameters containing the chat ID

#### Returns

`Promise`\<[`ContactInfo`](../interfaces/ContactInfo.md)\>

Promise resolving to contact information

***

### getContacts()

> **getContacts**(): `Promise`\<[`Contact`](../interfaces/Contact.md)[]\>

Defined in: [src/core/green-api.client.ts:552](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L552)

Gets a list of the current account contacts.
Note: Contact information updates can take up to 5 minutes.
If an empty array is received, retry the method call.

#### Returns

`Promise`\<[`Contact`](../interfaces/Contact.md)[]\>

Promise resolving to array of contacts

***

### getGroupData()

> **getGroupData**(`params`): `Promise`\<[`GroupData`](../interfaces/GroupData.md)\>

Defined in: [src/core/green-api.client.ts:627](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L627)

Gets group chat data.
Note: groupInviteLink will be empty if user is not an admin or owner.

#### Parameters

##### params

[`GetGroupData`](../interfaces/GetGroupData.md)

Parameters containing group ID

#### Returns

`Promise`\<[`GroupData`](../interfaces/GroupData.md)\>

Promise resolving to group data

***

### getMessage()

> **getMessage**(`params`): `Promise`\<[`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| `never` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| `never`\>

Defined in: [src/core/green-api.client.ts:706](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L706)

Gets details of a specific message.
Note: To receive incoming webhooks, requires "Receive webhooks on incoming messages and files" setting to be enabled.
Note: To receive statuses of sent messsages, requires "Receive notifications about the statuses of sent messages" to be enabled.
Messages can take up to 2 minutes to appear in the journal.

#### Parameters

##### params

[`GetMessage`](../interfaces/GetMessage.md)

Parameters containing chat ID and message ID

#### Returns

`Promise`\<[`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| `never` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| `never`\>

Promise resolving to message details

***

### getQR()

> **getQR**(): `Promise`\<[`QR`](../interfaces/QR.md)\>

Defined in: [src/core/green-api.client.ts:360](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L360)

Gets the QR code for GREEN-API instance authentication.

#### Returns

`Promise`\<[`QR`](../interfaces/QR.md)\>

Promise resolving to QR code data

***

### getSettings()

> **getSettings**(): `Promise`\<[`Settings`](../interfaces/Settings.md)\>

Defined in: [src/core/green-api.client.ts:369](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L369)

Gets current instance settings.

#### Returns

`Promise`\<[`Settings`](../interfaces/Settings.md)\>

Promise resolving to settings object

***

### getStateInstance()

> **getStateInstance**(): `Promise`\<[`StateInstance`](../interfaces/StateInstance.md)\>

Defined in: [src/core/green-api.client.ts:351](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L351)

Gets the current state of the GREEN-API instance.

#### Returns

`Promise`\<[`StateInstance`](../interfaces/StateInstance.md)\>

Promise resolving to instance state

***

### getWaSettings()

> **getWaSettings**(): `Promise`\<[`WaSettings`](../interfaces/WaSettings.md)\>

Defined in: [src/core/green-api.client.ts:388](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L388)

Gets WhatsApp-specific settings.

#### Returns

`Promise`\<[`WaSettings`](../interfaces/WaSettings.md)\>

Promise resolving to WhatsApp settings

***

### lastIncomingMessages()

> **lastIncomingMessages**(`minutes`?): `Promise`\<([`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| `never`)[]\>

Defined in: [src/core/green-api.client.ts:731](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L731)

Gets last incoming messages for the specified time period.
Default is 24 hours (1440 minutes).
Note: Requires "Receive webhooks" setting to be enabled.
Messages can take up to 2 minutes to appear in history.

#### Parameters

##### minutes?

`number`

Optional time period in minutes

#### Returns

`Promise`\<([`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`IncomingJournalFields`](../interfaces/IncomingJournalFields.md) & `object` & `object` \| `never`)[]\>

Promise resolving to array of incoming messages

***

### lastOutgoingMessages()

> **lastOutgoingMessages**(`minutes`?): `Promise`\<([`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| `never`)[]\>

Defined in: [src/core/green-api.client.ts:744](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L744)

Gets last outgoing messages for the specified time period.
Default is 24 hours (1440 minutes).
Note: Requires "Receive webhooks" setting to be enabled.
Messages can take up to 2 minutes to appear in history.

#### Parameters

##### minutes?

`number`

Optional time period in minutes

#### Returns

`Promise`\<([`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| [`BaseJournalMessage`](../interfaces/BaseJournalMessage.md) & [`OutgoingJournalFields`](../interfaces/OutgoingJournalFields.md) & `object` & `object` \| `never`)[]\>

Promise resolving to array of outgoing messages

***

### leaveGroup()

> **leaveGroup**(`params`): `Promise`\<[`LeaveGroupResponse`](../interfaces/LeaveGroupResponse.md)\>

Defined in: [src/core/green-api.client.ts:693](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L693)

Makes the current account leave a group chat.

#### Parameters

##### params

[`LeaveGroup`](../interfaces/LeaveGroup.md)

Parameters containing the group ID to leave

#### Returns

`Promise`\<[`LeaveGroupResponse`](../interfaces/LeaveGroupResponse.md)\>

Promise resolving to leave status

***

### logout()

> **logout**(): `Promise`\<[`Logout`](../interfaces/Logout.md)\>

Defined in: [src/core/green-api.client.ts:342](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L342)

Logs out from the GREEN-API instance.

#### Returns

`Promise`\<[`Logout`](../interfaces/Logout.md)\>

Promise resolving to logout status

***

### readChat()

> **readChat**(`params`): `Promise`\<[`ReadChatResponse`](../interfaces/ReadChatResponse.md)\>

Defined in: [src/core/green-api.client.ts:502](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L502)

Marks messages in a chat as read.
For this to work, "Receive webhooks on incoming messages and files" setting must be enabled.
Note: Only messages received after enabling the setting can be marked as read.

#### Parameters

##### params

[`ReadChat`](../interfaces/ReadChat.md)

Parameters specifying which messages to mark as read

#### Returns

`Promise`\<[`ReadChatResponse`](../interfaces/ReadChatResponse.md)\>

Promise resolving to read status

#### Example

```typescript
// Mark all messages in chat as read
const result = await client.readChat({
  chatId: "1234567890@c.us"
});

// Mark specific message as read
const result = await client.readChat({
  chatId: "1234567890@c.us",
  idMessage: "B275A7AA0D6EF89BB9245169BDF174E6"
});
```

***

### reboot()

> **reboot**(): `Promise`\<[`Reboot`](../interfaces/Reboot.md)\>

Defined in: [src/core/green-api.client.ts:333](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L333)

Reboots the GREEN-API instance.

#### Returns

`Promise`\<[`Reboot`](../interfaces/Reboot.md)\>

Promise resolving to reboot status

***

### removeAdmin()

> **removeAdmin**(`params`): `Promise`\<[`RemoveAdminResponse`](../interfaces/RemoveAdminResponse.md)\>

Defined in: [src/core/green-api.client.ts:669](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L669)

Removes administrator rights from a group chat participant.

#### Parameters

##### params

[`RemoveAdmin`](../interfaces/RemoveAdmin.md)

Parameters containing group ID and participant ID to demote

#### Returns

`Promise`\<[`RemoveAdminResponse`](../interfaces/RemoveAdminResponse.md)\>

Promise resolving to admin removal status

***

### removeGroupParticipant()

> **removeGroupParticipant**(`params`): `Promise`\<[`RemoveGroupParticipantResponse`](../interfaces/RemoveGroupParticipantResponse.md)\>

Defined in: [src/core/green-api.client.ts:649](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L649)

Removes a participant from a group chat.

#### Parameters

##### params

[`RemoveGroupParticipant`](../interfaces/RemoveGroupParticipant.md)

Parameters containing group ID and participant ID to remove

#### Returns

`Promise`\<[`RemoveGroupParticipantResponse`](../interfaces/RemoveGroupParticipantResponse.md)\>

Promise resolving to removal status

***

### sendContact()

> **sendContact**(`message`): `Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Defined in: [src/core/green-api.client.ts:320](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L320)

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

Defined in: [src/core/green-api.client.ts:223](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L223)

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

Defined in: [src/core/green-api.client.ts:195](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L195)

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

Defined in: [src/core/green-api.client.ts:291](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L291)

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

Defined in: [src/core/green-api.client.ts:169](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L169)

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

Defined in: [src/core/green-api.client.ts:250](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L250)

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

### setDisappearingChat()

> **setDisappearingChat**(`params`): `Promise`\<[`SetDisappearingChatResponse`](../interfaces/SetDisappearingChatResponse.md)\>

Defined in: [src/core/green-api.client.ts:595](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L595)

Changes settings of disappearing messages in chats.
Valid expiration times: 0 (off), 86400 (24h), 604800 (7d), 7776000 (90d)

#### Parameters

##### params

[`SetDisappearingChat`](../interfaces/SetDisappearingChat.md)

Parameters containing chat ID and message expiration time

#### Returns

`Promise`\<[`SetDisappearingChatResponse`](../interfaces/SetDisappearingChatResponse.md)\>

Promise resolving to chat disappearing message settings

***

### setGroupAdmin()

> **setGroupAdmin**(`params`): `Promise`\<[`SetGroupAdminResponse`](../interfaces/SetGroupAdminResponse.md)\>

Defined in: [src/core/green-api.client.ts:659](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L659)

Sets a group chat participant as an administrator.

#### Parameters

##### params

[`SetGroupAdmin`](../interfaces/SetGroupAdmin.md)

Parameters containing group ID and participant ID to promote

#### Returns

`Promise`\<[`SetGroupAdminResponse`](../interfaces/SetGroupAdminResponse.md)\>

Promise resolving to admin status change result

***

### setGroupPicture()

> **setGroupPicture**(`params`): `Promise`\<[`SetGroupPictureResponse`](../interfaces/SetGroupPictureResponse.md)\>

Defined in: [src/core/green-api.client.ts:679](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L679)

Sets a group chat picture.

#### Parameters

##### params

[`SetGroupPicture`](../interfaces/SetGroupPicture.md)

Parameters containing group ID and picture file (jpg)

#### Returns

`Promise`\<[`SetGroupPictureResponse`](../interfaces/SetGroupPictureResponse.md)\>

Promise resolving to picture update status

***

### setProfilePicture()

> **setProfilePicture**(`file`): `Promise`\<[`SetProfilePicture`](../interfaces/SetProfilePicture.md)\>

Defined in: [src/core/green-api.client.ts:398](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L398)

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

Defined in: [src/core/green-api.client.ts:379](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L379)

Updates instance settings.

#### Parameters

##### settings

[`Settings`](../interfaces/Settings.md)

New settings to apply

#### Returns

`Promise`\<[`SetSettingsResponse`](../interfaces/SetSettingsResponse.md)\>

Promise resolving to settings update response

***

### showMessagesQueue()

> **showMessagesQueue**(): `Promise`\<[`QueueMessage`](../interfaces/QueueMessage.md)[]\>

Defined in: [src/core/green-api.client.ts:458](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L458)

Gets the list of messages in the sending queue.
Messages are stored for 24 hours and will be sent immediately after phone authorization.
The sending speed is regulated by the Message Sending Interval parameter.

#### Returns

`Promise`\<[`QueueMessage`](../interfaces/QueueMessage.md)[]\>

Promise resolving to an array of queued messages

#### Example

```typescript
const queuedMessages = await client.showMessagesQueue();
console.log(queuedMessages);
```

***

### unarchiveChat()

> **unarchiveChat**(`params`): `Promise`\<`void`\>

Defined in: [src/core/green-api.client.ts:584](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L584)

Unarchives a chat.

#### Parameters

##### params

[`UnarchiveChat`](../interfaces/UnarchiveChat.md)

Parameters containing the chat ID to unarchive

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

***

### updateGroupName()

> **updateGroupName**(`params`): `Promise`\<[`UpdateGroupNameResponse`](../interfaces/UpdateGroupNameResponse.md)\>

Defined in: [src/core/green-api.client.ts:616](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L616)

Changes a group chat name.

#### Parameters

##### params

[`UpdateGroupName`](../interfaces/UpdateGroupName.md)

Parameters containing group ID and new name

#### Returns

`Promise`\<[`UpdateGroupNameResponse`](../interfaces/UpdateGroupNameResponse.md)\>

Promise resolving to update status

***

### uploadFile()

> **uploadFile**(`file`, `customFileName`?): `Promise`\<[`UploadFile`](../interfaces/UploadFile.md)\>

Defined in: [src/core/green-api.client.ts:411](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/core/green-api.client.ts#L411)

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
