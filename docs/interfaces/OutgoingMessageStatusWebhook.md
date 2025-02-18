[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / OutgoingMessageStatusWebhook

# Interface: OutgoingMessageStatusWebhook

Defined in: [src/types/types.ts:443](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/types/types.ts#L443)

Webhook payload received when a message status changes.
Used to track delivery and read receipts.

## Properties

### chatId

> **chatId**: `string`

Defined in: [src/types/types.ts:445](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/types/types.ts#L445)

***

### description?

> `optional` **description**: `string`

Defined in: [src/types/types.ts:454](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/types/types.ts#L454)

***

### idMessage

> **idMessage**: `string`

Defined in: [src/types/types.ts:452](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/types/types.ts#L452)

***

### instanceData

> **instanceData**: `object`

Defined in: [src/types/types.ts:446](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/types/types.ts#L446)

#### idInstance

> **idInstance**: `number`

#### typeInstance

> **typeInstance**: `string`

#### wid

> **wid**: `string`

***

### sendByApi

> **sendByApi**: `boolean`

Defined in: [src/types/types.ts:455](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/types/types.ts#L455)

***

### status

> **status**: [`OutgoingMessageStatus`](../type-aliases/OutgoingMessageStatus.md)

Defined in: [src/types/types.ts:453](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/types/types.ts#L453)

***

### timestamp

> **timestamp**: `number`

Defined in: [src/types/types.ts:451](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/types/types.ts#L451)

***

### typeWebhook

> **typeWebhook**: `"outgoingMessageStatus"`

Defined in: [src/types/types.ts:444](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/types/types.ts#L444)
