[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / OutgoingMessageStatusWebhook

# Interface: OutgoingMessageStatusWebhook

Defined in: [src/types/types.ts:318](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L318)

Webhook payload received when a message status changes.
Used to track delivery and read receipts.

## Properties

### chatId

> **chatId**: `string`

Defined in: [src/types/types.ts:320](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L320)

***

### description?

> `optional` **description**: `string`

Defined in: [src/types/types.ts:329](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L329)

***

### idMessage

> **idMessage**: `string`

Defined in: [src/types/types.ts:327](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L327)

***

### instanceData

> **instanceData**: `object`

Defined in: [src/types/types.ts:321](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L321)

#### idInstance

> **idInstance**: `number`

#### typeInstance

> **typeInstance**: `string`

#### wid

> **wid**: `string`

***

### sendByApi

> **sendByApi**: `boolean`

Defined in: [src/types/types.ts:330](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L330)

***

### status

> **status**: [`OutgoingMessageStatus`](../type-aliases/OutgoingMessageStatus.md)

Defined in: [src/types/types.ts:328](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L328)

***

### timestamp

> **timestamp**: `number`

Defined in: [src/types/types.ts:326](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L326)

***

### typeWebhook

> **typeWebhook**: `"outgoingMessageStatus"`

Defined in: [src/types/types.ts:319](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L319)
