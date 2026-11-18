[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / MessageWebhook

# Interface: MessageWebhook

Defined in: [src/types/types.ts:640](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/types/types.ts#L640)

## Properties

### idMessage

> **idMessage**: `string`

Defined in: [src/types/types.ts:648](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/types/types.ts#L648)

***

### instanceData

> **instanceData**: `object`

Defined in: [src/types/types.ts:642](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/types/types.ts#L642)

#### idInstance

> **idInstance**: `number`

#### typeInstance

> **typeInstance**: `string`

#### wid

> **wid**: `string`

***

### messageData

> **messageData**: [`WebhookMessageData`](../type-aliases/WebhookMessageData.md) & `object`

Defined in: [src/types/types.ts:657](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/types/types.ts#L657)

#### Type Declaration

##### quotedMessage?

> `optional` **quotedMessage?**: QuotedMessage \| undefined

***

### senderData

> **senderData**: `object`

Defined in: [src/types/types.ts:649](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/types/types.ts#L649)

#### chatId

> **chatId**: `string`

#### chatName

> **chatName**: `string`

#### sender

> **sender**: `string`

#### senderContactName?

> `optional` **senderContactName?**: `string`

#### senderName

> **senderName**: `string`

#### senderPhoneNumber?

> `optional` **senderPhoneNumber?**: `number`

***

### timestamp

> **timestamp**: `number`

Defined in: [src/types/types.ts:647](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/types/types.ts#L647)

***

### typeWebhook

> **typeWebhook**: `"outgoingAPIMessageReceived"` \| `"outgoingMessageReceived"` \| `"incomingMessageReceived"`

Defined in: [src/types/types.ts:641](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/types/types.ts#L641)
