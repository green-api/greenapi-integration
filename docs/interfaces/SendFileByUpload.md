[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / SendFileByUpload

# Interface: SendFileByUpload

Defined in: [src/types/types.ts:43](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L43)

Common properties shared by all message types.

## Extends

- [`BaseMessage`](BaseMessage.md)

## Properties

### caption?

> `optional` **caption?**: `string`

Defined in: [src/types/types.ts:44](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L44)

***

### chatId

> **chatId**: `string`

Defined in: [src/types/types.ts:26](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L26)

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`chatId`](BaseMessage.md#chatid)

***

### file

> **file**: `object`

Defined in: [src/types/types.ts:45](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L45)

#### data

> **data**: `Blob` \| `File` \| `Uint8Array`\<`ArrayBufferLike`\>

#### fileName

> **fileName**: `string`

***

### quotedMessageId?

> `optional` **quotedMessageId?**: `string`

Defined in: [src/types/types.ts:27](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L27)

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`quotedMessageId`](BaseMessage.md#quotedmessageid)
