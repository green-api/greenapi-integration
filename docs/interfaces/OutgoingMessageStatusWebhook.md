[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / OutgoingMessageStatusWebhook

# Interface: OutgoingMessageStatusWebhook

Defined in: [src/types/types.ts:547](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/types/types.ts#L547)

Webhook payload received when a message status changes.
Used to track delivery and read receipts.

## Properties

### chatId

> **chatId**: `string`

Defined in: [src/types/types.ts:549](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/types/types.ts#L549)

***

### description?

> `optional` **description?**: `string`

Defined in: [src/types/types.ts:558](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/types/types.ts#L558)

***

### idMessage

> **idMessage**: `string`

Defined in: [src/types/types.ts:556](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/types/types.ts#L556)

***

### instanceData

> **instanceData**: `object`

Defined in: [src/types/types.ts:550](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/types/types.ts#L550)

#### idInstance

> **idInstance**: `number`

#### typeInstance

> **typeInstance**: `string`

#### wid

> **wid**: `string`

***

### sendByApi

> **sendByApi**: `boolean`

Defined in: [src/types/types.ts:559](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/types/types.ts#L559)

***

### status

> **status**: [`OutgoingMessageStatus`](../type-aliases/OutgoingMessageStatus.md)

Defined in: [src/types/types.ts:557](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/types/types.ts#L557)

***

### timestamp

> **timestamp**: `number`

Defined in: [src/types/types.ts:555](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/types/types.ts#L555)

***

### typeWebhook

> **typeWebhook**: `"outgoingMessageStatus"`

Defined in: [src/types/types.ts:548](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/types/types.ts#L548)
