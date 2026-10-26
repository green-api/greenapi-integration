[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / SendInteractiveButtons

# Interface: SendInteractiveButtons

Defined in: [src/types/types.ts:82](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L82)

Common properties shared by all message types.

## Extends

- [`BaseMessage`](BaseMessage.md)

## Properties

### body

> **body**: `string`

Defined in: [src/types/types.ts:84](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L84)

***

### buttons

> **buttons**: `object`[]

Defined in: [src/types/types.ts:86](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L86)

#### buttonId

> **buttonId**: `string`

#### buttonText

> **buttonText**: `string`

#### copyCode?

> `optional` **copyCode?**: `string`

#### phoneNumber?

> `optional` **phoneNumber?**: `string`

#### type

> **type**: `"copy"` \| `"call"` \| `"url"`

#### url?

> `optional` **url?**: `string`

***

### chatId

> **chatId**: `string`

Defined in: [src/types/types.ts:26](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L26)

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`chatId`](BaseMessage.md#chatid)

***

### footer?

> `optional` **footer?**: `string`

Defined in: [src/types/types.ts:85](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L85)

***

### header?

> `optional` **header?**: `string`

Defined in: [src/types/types.ts:83](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L83)

***

### quotedMessageId?

> `optional` **quotedMessageId?**: `string`

Defined in: [src/types/types.ts:27](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L27)

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`quotedMessageId`](BaseMessage.md#quotedmessageid)
