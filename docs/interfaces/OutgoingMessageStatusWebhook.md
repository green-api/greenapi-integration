[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / OutgoingMessageStatusWebhook

# Interface: OutgoingMessageStatusWebhook

Defined in: [src/types/types.ts:211](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L211)

Webhook payload received when a message status changes.
Used to track delivery and read receipts.

## Properties

### chatId

> **chatId**: `string`

Defined in: [src/types/types.ts:213](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L213)

***

### description?

> `optional` **description**: `string`

Defined in: [src/types/types.ts:222](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L222)

***

### idMessage

> **idMessage**: `string`

Defined in: [src/types/types.ts:220](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L220)

***

### instanceData

> **instanceData**: `object`

Defined in: [src/types/types.ts:214](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L214)

#### idInstance

> **idInstance**: `number`

#### typeInstance

> **typeInstance**: `string`

#### wid

> **wid**: `string`

***

### sendByApi

> **sendByApi**: `boolean`

Defined in: [src/types/types.ts:223](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L223)

***

### status

> **status**: [`OutgoingMessageStatus`](../type-aliases/OutgoingMessageStatus.md)

Defined in: [src/types/types.ts:221](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L221)

***

### timestamp

> **timestamp**: `number`

Defined in: [src/types/types.ts:219](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L219)

***

### typeWebhook

> **typeWebhook**: `"outgoingMessageStatus"`

Defined in: [src/types/types.ts:212](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L212)
