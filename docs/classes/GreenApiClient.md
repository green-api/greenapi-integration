[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / GreenApiClient

# Class: GreenApiClient

Defined in: [src/core/green-api.client.ts:90](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L90)

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

### Constructor

> **new GreenApiClient**(`instance`, `options?`): `GreenApiClient`

Defined in: [src/core/green-api.client.ts:103](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L103)

Creates a GREEN-API client instance.

#### Parameters

##### instance

[`Instance`](../interfaces/Instance.md)

Configuration containing idInstance, apiTokenInstance and optionally apiUrl and mediaUrl

##### options?

[`GreenApiClientOptions`](../interfaces/GreenApiClientOptions.md) = `{}`

Client options, e.g. `logger: null` to disable request logging

#### Returns

`GreenApiClient`

## Methods

### addGroupParticipant()

> **addGroupParticipant**(`params`): `Promise`\<[`AddGroupParticipantResponse`](../interfaces/AddGroupParticipantResponse.md)\>

Defined in: [src/core/green-api.client.ts:868](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L868)

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

Defined in: [src/core/green-api.client.ts:803](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L803)

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

### checkAccount()

> **checkAccount**(`params`): `Promise`\<[`CheckAccountResponse`](../interfaces/CheckAccountResponse.md)\>

Defined in: [src/core/green-api.client.ts:754](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L754)

Checks whether a messenger account exists for a phone number or username (Telegram, MAX).

#### Parameters

##### params

[`CheckAccount`](../interfaces/CheckAccount.md)

Phone number in international format, or a Telegram username starting with "@"

#### Returns

`Promise`\<[`CheckAccountResponse`](../interfaces/CheckAccountResponse.md)\>

Promise resolving to the existence flag and, when the account exists, its chat id

#### Throws

If neither phoneNumber nor username is given

***

### checkWhatsapp()

> **checkWhatsapp**(`params`): `Promise`\<[`CheckWhatsappResponse`](../interfaces/CheckWhatsappResponse.md)\>

Defined in: [src/core/green-api.client.ts:736](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L736)

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

Defined in: [src/core/green-api.client.ts:631](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L631)

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

Defined in: [src/core/green-api.client.ts:835](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L835)

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

### deleteNotification()

> **deleteNotification**(`receiptId`): `Promise`\<[`DeleteNotificationResponse`](../interfaces/DeleteNotificationResponse.md)\>

Defined in: [src/core/green-api.client.ts:688](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L688)

Deletes a processed notification from the instance queue.

#### Parameters

##### receiptId

`number`

Receipt ID from receiveNotification

#### Returns

`Promise`\<[`DeleteNotificationResponse`](../interfaces/DeleteNotificationResponse.md)\>

Promise resolving to deletion result

***

### forwardMessages()

> **forwardMessages**(`request`): `Promise`\<[`ForwardMessagesResponse`](../interfaces/ForwardMessagesResponse.md)\>

Defined in: [src/core/green-api.client.ts:310](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L310)

Forwards messages from one chat to another.

#### Parameters

##### request

[`ForwardMessages`](../interfaces/ForwardMessages.md)

Forward request with source and target chat IDs

#### Returns

`Promise`\<[`ForwardMessagesResponse`](../interfaces/ForwardMessagesResponse.md)\>

Promise resolving to forward response

***

### getAccountSettings()

> **getAccountSettings**(): `Promise`\<[`AccountSettings`](../interfaces/AccountSettings.md)\>

Defined in: [src/core/green-api.client.ts:522](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L522)

Gets WhatsApp-specific settings.

#### Returns

`Promise`\<[`AccountSettings`](../interfaces/AccountSettings.md)\>

Promise resolving to WhatsApp settings

***

### getAuthorizationCode()

> **getAuthorizationCode**(`phoneNumber`): `Promise`\<[`GetAuthorizationCode`](../interfaces/GetAuthorizationCode.md)\>

Defined in: [src/core/green-api.client.ts:593](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L593)

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

Defined in: [src/core/green-api.client.ts:770](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L770)

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

> **getChatHistory**(`params`): `Promise`\<[`JournalResponse`](../type-aliases/JournalResponse.md)[]\>

Defined in: [src/core/green-api.client.ts:947](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L947)

Gets chat message history.
Note: Requires "Receive webhooks" setting to be enabled.
Messages can take up to 2 minutes to appear in history.

#### Parameters

##### params

[`GetChatHistory`](../interfaces/GetChatHistory.md)

Parameters containing chat ID and optional message count

#### Returns

`Promise`\<[`JournalResponse`](../type-aliases/JournalResponse.md)[]\>

Promise resolving to array of messages

***

### getContactInfo()

> **getContactInfo**(`params`): `Promise`\<[`ContactInfo`](../interfaces/ContactInfo.md)\>

Defined in: [src/core/green-api.client.ts:792](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L792)

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

Defined in: [src/core/green-api.client.ts:781](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L781)

Gets a list of the current account contacts.
Note: Contact information updates can take up to 5 minutes.
If an empty array is received, retry the method call.

#### Returns

`Promise`\<[`Contact`](../interfaces/Contact.md)[]\>

Promise resolving to array of contacts

***

### getGroupData()

> **getGroupData**(`params`): `Promise`\<[`GroupData`](../interfaces/GroupData.md)\>

Defined in: [src/core/green-api.client.ts:856](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L856)

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

### getIncomingStatuses()

> **getIncomingStatuses**(`minutes?`): `Promise`\<[`IncomingJournalResponse`](../type-aliases/IncomingJournalResponse.md)[]\>

Defined in: [src/core/green-api.client.ts:1061](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L1061)

The method returns the incoming status messages of the instance. 
In the default mode the incoming status messages for 24 hours are returned.
Note: Requires "Receive webhooks" setting to be enabled.
Messages can take up to 2 minutes to appear in history.

#### Parameters

##### minutes?

`number`

Optional time period in minutes

#### Returns

`Promise`\<[`IncomingJournalResponse`](../type-aliases/IncomingJournalResponse.md)[]\>

Promise resolving to array of incoming statuses

***

### getMessage()

> **getMessage**(`params`): `Promise`\<[`JournalResponse`](../type-aliases/JournalResponse.md)\>

Defined in: [src/core/green-api.client.ts:935](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L935)

Gets details of a specific message.
Note: To receive incoming webhooks, requires "Receive webhooks on incoming messages and files" setting to be enabled.
Note: To receive statuses of sent messsages, requires "Receive notifications about the statuses of sent messages" to be enabled.
Messages can take up to 2 minutes to appear in the journal.

#### Parameters

##### params

[`GetMessage`](../interfaces/GetMessage.md)

Parameters containing chat ID and message ID

#### Returns

`Promise`\<[`JournalResponse`](../type-aliases/JournalResponse.md)\>

Promise resolving to message details

***

### getOutgoingStatuses()

> **getOutgoingStatuses**(`minutes?`): `Promise`\<[`OutgoingJournalResponse`](../type-aliases/OutgoingJournalResponse.md)[]\>

Defined in: [src/core/green-api.client.ts:1074](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L1074)

The method returns the outgoing statuses of the account.
In the default mode the outgoing status messages for 24 hours are returned.
Note: Requires "Receive webhooks" setting to be enabled.
Messages can take up to 2 minutes to appear in history.

#### Parameters

##### minutes?

`number`

Optional time period in minutes

#### Returns

`Promise`\<[`OutgoingJournalResponse`](../type-aliases/OutgoingJournalResponse.md)[]\>

Promise resolving to array of outgoing statuses

***

### getQR()

> **getQR**(): `Promise`\<[`QR`](../interfaces/QR.md)\>

Defined in: [src/core/green-api.client.ts:494](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L494)

Gets the QR code for GREEN-API instance authentication.

#### Returns

`Promise`\<[`QR`](../interfaces/QR.md)\>

Promise resolving to QR code data

***

### getSettings()

> **getSettings**(): `Promise`\<[`Settings`](../interfaces/Settings.md)\>

Defined in: [src/core/green-api.client.ts:503](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L503)

Gets current instance settings.

#### Returns

`Promise`\<[`Settings`](../interfaces/Settings.md)\>

Promise resolving to settings object

***

### getStateInstance()

> **getStateInstance**(): `Promise`\<[`StateInstance`](../interfaces/StateInstance.md)\>

Defined in: [src/core/green-api.client.ts:485](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L485)

Gets the current state of the GREEN-API instance.

#### Returns

`Promise`\<[`StateInstance`](../interfaces/StateInstance.md)\>

Promise resolving to instance state

***

### getStatusStatistic()

> **getStatusStatistic**(`idMessage?`): `Promise`\<[`GetStatusStatisticResponse`](../interfaces/GetStatusStatisticResponse.md)[]\>

Defined in: [src/core/green-api.client.ts:1086](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L1086)

The method returns an array of recipients marked sent/delivered/read for a given status.
Note: Requires "Receive webhooks" setting to be enabled.
Messages can take up to 2 minutes to appear in history.

#### Parameters

##### idMessage?

`string`

Status message ID

#### Returns

`Promise`\<[`GetStatusStatisticResponse`](../interfaces/GetStatusStatisticResponse.md)[]\>

Promise resolving to array participant, timestamp, status

***

### getWaSettings()

> **getWaSettings**(): `Promise`\<[`WaSettings`](../interfaces/WaSettings.md)\>

Defined in: [src/core/green-api.client.ts:526](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L526)

#### Returns

`Promise`\<[`WaSettings`](../interfaces/WaSettings.md)\>

***

### lastIncomingMessages()

> **lastIncomingMessages**(`minutes?`): `Promise`\<[`IncomingJournalResponse`](../type-aliases/IncomingJournalResponse.md)[]\>

Defined in: [src/core/green-api.client.ts:960](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L960)

Gets last incoming messages for the specified time period.
Default is 24 hours (1440 minutes).
Note: Requires "Receive webhooks" setting to be enabled.
Messages can take up to 2 minutes to appear in history.

#### Parameters

##### minutes?

`number`

Optional time period in minutes

#### Returns

`Promise`\<[`IncomingJournalResponse`](../type-aliases/IncomingJournalResponse.md)[]\>

Promise resolving to array of incoming messages

***

### lastOutgoingMessages()

> **lastOutgoingMessages**(`minutes?`): `Promise`\<[`OutgoingJournalResponse`](../type-aliases/OutgoingJournalResponse.md)[]\>

Defined in: [src/core/green-api.client.ts:973](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L973)

Gets last outgoing messages for the specified time period.
Default is 24 hours (1440 minutes).
Note: Requires "Receive webhooks" setting to be enabled.
Messages can take up to 2 minutes to appear in history.

#### Parameters

##### minutes?

`number`

Optional time period in minutes

#### Returns

`Promise`\<[`OutgoingJournalResponse`](../type-aliases/OutgoingJournalResponse.md)[]\>

Promise resolving to array of outgoing messages

***

### leaveGroup()

> **leaveGroup**(`params`): `Promise`\<[`LeaveGroupResponse`](../interfaces/LeaveGroupResponse.md)\>

Defined in: [src/core/green-api.client.ts:922](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L922)

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

Defined in: [src/core/green-api.client.ts:476](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L476)

Logs out from the GREEN-API instance.

#### Returns

`Promise`\<[`Logout`](../interfaces/Logout.md)\>

Promise resolving to logout status

***

### readChat()

> **readChat**(`params`): `Promise`\<[`ReadChatResponse`](../interfaces/ReadChatResponse.md)\>

Defined in: [src/core/green-api.client.ts:714](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L714)

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

Defined in: [src/core/green-api.client.ts:467](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L467)

Reboots the GREEN-API instance.

#### Returns

`Promise`\<[`Reboot`](../interfaces/Reboot.md)\>

Promise resolving to reboot status

***

### receiveNotification()

> **receiveNotification**(`receiveTimeout?`): `Promise`\<[`ReceiveNotificationResponse`](../interfaces/ReceiveNotificationResponse.md) \| `null`\>

Defined in: [src/core/green-api.client.ts:672](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L672)

Receives the next notification from the instance queue.

#### Parameters

##### receiveTimeout?

`number`

Seconds to wait for a notification, 5 to 60

#### Returns

`Promise`\<[`ReceiveNotificationResponse`](../interfaces/ReceiveNotificationResponse.md) \| `null`\>

Promise resolving to the notification, or null when the queue stayed empty

#### Example

```typescript
const notification = await client.receiveNotification(20);
if (notification) {
  await client.deleteNotification(notification.receiptId);
}
```

***

### removeAdmin()

> **removeAdmin**(`params`): `Promise`\<[`RemoveAdminResponse`](../interfaces/RemoveAdminResponse.md)\>

Defined in: [src/core/green-api.client.ts:898](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L898)

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

Defined in: [src/core/green-api.client.ts:878](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L878)

Removes a participant from a group chat.

#### Parameters

##### params

[`RemoveGroupParticipant`](../interfaces/RemoveGroupParticipant.md)

Parameters containing group ID and participant ID to remove

#### Returns

`Promise`\<[`RemoveGroupParticipantResponse`](../interfaces/RemoveGroupParticipantResponse.md)\>

Promise resolving to removal status

***

### request()

> **request**\<`T`\>(`method`, `endpoint`, `data?`, `queryParams?`): `Promise`\<`T`\>

Defined in: [src/core/green-api.client.ts:649](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L649)

Calls any GREEN-API method by name.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### method

`"get"` \| `"delete"` \| `"post"`

HTTP method

##### endpoint

`string`

GREEN-API method name, e.g. "getContacts"

##### data?

`unknown`

Request body for POST

##### queryParams?

`Record`\<`string`, `string` \| `number`\>

Query parameters

#### Returns

`Promise`\<`T`\>

Promise resolving to the raw response body

#### Example

```typescript
const contacts = await client.request("get", "getContacts");
```

***

### requestWithFile()

> **requestWithFile**\<`T`\>(`endpoint`, `file`, `fields?`): `Promise`\<`T`\>

Defined in: [src/core/green-api.client.ts:569](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L569)

Calls any GREEN-API method that takes a file.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### endpoint

`string`

GREEN-API method name, e.g. "setGroupPicture"

##### file

File content and file name

###### data

`Blob` \| `File` \| `Uint8Array`\<`ArrayBufferLike`\>

###### fileName

`string`

##### fields?

`Record`\<`string`, `string` \| `number` \| `boolean`\> = `{}`

Other form fields

#### Returns

`Promise`\<`T`\>

Promise resolving to the raw response body

***

### sendContact()

> **sendContact**(`message`): `Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Defined in: [src/core/green-api.client.ts:364](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L364)

Sends a contact card to a WhatsApp chat.

#### Parameters

##### message

[`SendContact`](../interfaces/SendContact.md)

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

Defined in: [src/core/green-api.client.ts:267](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L267)

Sends a file from local data to a WhatsApp chat.

#### Parameters

##### message

[`SendFileByUpload`](../interfaces/SendFileByUpload.md)

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

Defined in: [src/core/green-api.client.ts:239](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L239)

Sends a file from a URL to a WhatsApp chat.

#### Parameters

##### message

[`SendFileByUrl`](../interfaces/SendFileByUrl.md)

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

### sendInteractiveButtons()

> **sendInteractiveButtons**(`message`): `Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Defined in: [src/core/green-api.client.ts:409](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L409)

Sends interactive buttons to a WhatsApp chat.
Supports copy, call, url, and reply button types.

#### Parameters

##### message

[`SendInteractiveButtons`](../interfaces/SendInteractiveButtons.md)

Interactive buttons message data

#### Returns

`Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Promise resolving to send response

#### Example

```typescript
await client.sendInteractiveButtons({
  chatId: "1234567890@c.us",
  header: "Choose an option",
  body: "Please select one of the following:",
  footer: "Powered by GREEN-API",
  buttons: [
    {
      type: "copy",
      buttonId: "1",
      buttonText: "Copy Code",
      copyCode: "DISCOUNT50"
    },
    {
      type: "call",
      buttonId: "2", 
      buttonText: "Call Us",
      phoneNumber: "1234567890"
    },
    {
      type: "url",
      buttonId: "3",
      buttonText: "Visit Website",
      url: "https://example.com"
    }
  ]
});
```

***

### sendInteractiveButtonsReply()

> **sendInteractiveButtonsReply**(`message`): `Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Defined in: [src/core/green-api.client.ts:451](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L451)

Sends interactive reply buttons to a WhatsApp chat.
These buttons return text to the chat when pressed.

#### Parameters

##### message

[`SendInteractiveButtonsReply`](../interfaces/SendInteractiveButtonsReply.md)

Interactive reply buttons message data

#### Returns

`Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Promise resolving to send response

#### Example

```typescript
await client.sendInteractiveButtonsReply({
  chatId: "1234567890@c.us",
  header: "Survey",
  body: "How satisfied are you with our service?",
  footer: "Your feedback matters",
  buttons: [
    {
      buttonId: "1",
      buttonText: "Very Satisfied"
    },
    {
      buttonId: "2", 
      buttonText: "Satisfied"
    },
    {
      buttonId: "3",
      buttonText: "Needs Improvement"
    }
  ]
});
```

***

### sendLocation()

> **sendLocation**(`message`): `Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Defined in: [src/core/green-api.client.ts:335](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L335)

Sends a location to a WhatsApp chat.

#### Parameters

##### message

[`SendLocation`](../interfaces/SendLocation.md)

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

### sendMediaStatus()

> **sendMediaStatus**(`status`): `Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Defined in: [src/core/green-api.client.ts:1043](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L1043)

The method is aimed for sending a pictures or video status

#### Parameters

##### status

[`SendMediaStatus`](../interfaces/SendMediaStatus.md)

Message data containing urlFile, fileName, backgroundColor (optional), participants (optional)

#### Returns

`Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Promise resolving to send response with message ID

#### Example

```typescript
await client.sendVoiceStatus({
  urlFile: "https://my.site.com/img/horse.png",
  fileName: "horse.png",
  caption: "Little horse",
  participants: ["70000001234@c.us", "440000001234@c.us"] // optional
});
```

***

### sendMessage()

> **sendMessage**(`message`): `Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Defined in: [src/core/green-api.client.ts:213](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L213)

Sends a text message to a WhatsApp chat.

#### Parameters

##### message

[`SendMessage`](../interfaces/SendMessage.md)

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

Defined in: [src/core/green-api.client.ts:294](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L294)

Creates a poll in a WhatsApp chat.

#### Parameters

##### message

[`SendPoll`](../interfaces/SendPoll.md)

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

### sendTextStatus()

> **sendTextStatus**(`status`): `Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Defined in: [src/core/green-api.client.ts:993](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L993)

The method is aimed for sending a text status

#### Parameters

##### status

[`SendTextStatus`](../interfaces/SendTextStatus.md)

Status data containing message, backgroundColor (optional), font (optional), participants (optional)

#### Returns

`Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Promise resolving to send response with message ID

#### Example

```typescript
await client.sendTextStatus({
  message: "I use Green-API to send this status!",
  backgroundColor: "#228B22", // optional
  font: "SERIF", // optional
  participants: ["70000001234@c.us", "440000001234@c.us"] // optional
});
```

***

### sendVoiceStatus()

> **sendVoiceStatus**(`status`): `Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Defined in: [src/core/green-api.client.ts:1018](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L1018)

The method is aimed for sending a voice status

#### Parameters

##### status

[`SendVoiceStatus`](../interfaces/SendVoiceStatus.md)

Status data containing urlFile, fileName, backgroundColor (optional), participants (optional)

#### Returns

`Promise`\<[`SendResponse`](../interfaces/SendResponse.md)\>

Promise resolving to send response with message ID

#### Example

```typescript
await client.sendVoiceStatus({
  urlFile: "https://my.site.com/img/horse.mp3",
  fileName: "horse.mp3",
  backgroundColor: "#228B22", // optional
  participants: ["70000001234@c.us", "440000001234@c.us"] // optional
});
```

***

### setDisappearingChat()

> **setDisappearingChat**(`params`): `Promise`\<[`SetDisappearingChatResponse`](../interfaces/SetDisappearingChatResponse.md)\>

Defined in: [src/core/green-api.client.ts:824](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L824)

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

Defined in: [src/core/green-api.client.ts:888](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L888)

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

Defined in: [src/core/green-api.client.ts:908](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L908)

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

> **setProfilePicture**(`file`, `fileName?`): `Promise`\<[`SetProfilePicture`](../interfaces/SetProfilePicture.md)\>

Defined in: [src/core/green-api.client.ts:537](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L537)

Sets the profile picture for the WhatsApp account.

#### Parameters

##### file

`Blob` \| `File` \| `Uint8Array`\<`ArrayBufferLike`\>

Image file (jpg) to use as profile picture

##### fileName?

`string`

File name with extension

#### Returns

`Promise`\<[`SetProfilePicture`](../interfaces/SetProfilePicture.md)\>

Promise resolving to profile picture update response

***

### setSettings()

> **setSettings**(`settings`): `Promise`\<[`SetSettingsResponse`](../interfaces/SetSettingsResponse.md)\>

Defined in: [src/core/green-api.client.ts:513](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L513)

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

Defined in: [src/core/green-api.client.ts:613](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L613)

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

Defined in: [src/core/green-api.client.ts:813](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L813)

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

Defined in: [src/core/green-api.client.ts:845](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L845)

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

> **uploadFile**(`file`, `fileName?`): `Promise`\<[`UploadFile`](../interfaces/UploadFile.md)\>

Defined in: [src/core/green-api.client.ts:548](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/core/green-api.client.ts#L548)

Uploads a file to GREEN-API servers.

#### Parameters

##### file

`Blob` \| `File` \| `Uint8Array`\<`ArrayBufferLike`\>

File to upload

##### fileName?

`string`

File name with extension

#### Returns

`Promise`\<[`UploadFile`](../interfaces/UploadFile.md)\>

Promise resolving to upload response with file URL
