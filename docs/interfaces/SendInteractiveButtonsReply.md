[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / SendInteractiveButtonsReply

# Interface: SendInteractiveButtonsReply

Defined in: [src/types/types.ts:96](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L96)

Common properties shared by all message types.

## Extends

- [`BaseMessage`](BaseMessage.md)

## Properties

### body

> **body**: `string`

Defined in: [src/types/types.ts:98](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L98)

***

### buttons

> **buttons**: `object`[]

Defined in: [src/types/types.ts:100](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L100)

#### buttonId

> **buttonId**: `string`

#### buttonText

> **buttonText**: `string`

***

### chatId

> **chatId**: `string`

Defined in: [src/types/types.ts:26](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L26)

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`chatId`](BaseMessage.md#chatid)

***

### footer?

> `optional` **footer?**: `string`

Defined in: [src/types/types.ts:99](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L99)

***

### header?

> `optional` **header?**: `string`

Defined in: [src/types/types.ts:97](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L97)

***

### quotedMessageId?

> `optional` **quotedMessageId?**: `string`

Defined in: [src/types/types.ts:27](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L27)

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`quotedMessageId`](BaseMessage.md#quotedmessageid)
