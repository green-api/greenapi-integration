[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / OutgoingMessageStatusWebhook

# Interface: OutgoingMessageStatusWebhook

Defined in: [src/types/types.ts:219](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L219)

Webhook payload received when a message status changes.
Used to track delivery and read receipts.

## Properties

### chatId

> **chatId**: `string`

Defined in: [src/types/types.ts:221](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L221)

***

### description?

> `optional` **description**: `string`

Defined in: [src/types/types.ts:230](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L230)

***

### idMessage

> **idMessage**: `string`

Defined in: [src/types/types.ts:228](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L228)

***

### instanceData

> **instanceData**: `object`

Defined in: [src/types/types.ts:222](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L222)

#### idInstance

> **idInstance**: `number`

#### typeInstance

> **typeInstance**: `string`

#### wid

> **wid**: `string`

***

### sendByApi

> **sendByApi**: `boolean`

Defined in: [src/types/types.ts:231](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L231)

***

### status

> **status**: [`OutgoingMessageStatus`](../type-aliases/OutgoingMessageStatus.md)

Defined in: [src/types/types.ts:229](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L229)

***

### timestamp

> **timestamp**: `number`

Defined in: [src/types/types.ts:227](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L227)

***

### typeWebhook

> **typeWebhook**: `"outgoingMessageStatus"`

Defined in: [src/types/types.ts:220](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L220)
