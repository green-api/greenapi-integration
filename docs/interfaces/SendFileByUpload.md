[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / SendFileByUpload

# Interface: SendFileByUpload

Defined in: [src/types/types.ts:41](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/types/types.ts#L41)

Common properties shared by all message types.

## Extends

- [`BaseMessage`](BaseMessage.md)

## Properties

### caption?

> `optional` **caption**: `string`

Defined in: [src/types/types.ts:42](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/types/types.ts#L42)

***

### chatId

> **chatId**: `string`

Defined in: [src/types/types.ts:24](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/types/types.ts#L24)

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`chatId`](BaseMessage.md#chatid)

***

### file

> **file**: `object`

Defined in: [src/types/types.ts:43](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/types/types.ts#L43)

#### data

> **data**: `Blob` \| `File`

#### fileName

> **fileName**: `string`

***

### quotedMessageId?

> `optional` **quotedMessageId**: `string`

Defined in: [src/types/types.ts:25](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/types/types.ts#L25)

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`quotedMessageId`](BaseMessage.md#quotedmessageid)
