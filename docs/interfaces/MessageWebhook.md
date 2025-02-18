[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / MessageWebhook

# Interface: MessageWebhook

Defined in: [src/types/types.ts:524](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/types/types.ts#L524)

## Properties

### idMessage

> **idMessage**: `string`

Defined in: [src/types/types.ts:532](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/types/types.ts#L532)

***

### instanceData

> **instanceData**: `object`

Defined in: [src/types/types.ts:526](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/types/types.ts#L526)

#### idInstance

> **idInstance**: `number`

#### typeInstance

> **typeInstance**: `string`

#### wid

> **wid**: `string`

***

### messageData

> **messageData**: [`WebhookMessageData`](../type-aliases/WebhookMessageData.md) & `object`

Defined in: [src/types/types.ts:540](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/types/types.ts#L540)

#### Type declaration

##### quotedMessage?

> `optional` **quotedMessage**: QuotedMessage \| undefined

***

### senderData

> **senderData**: `object`

Defined in: [src/types/types.ts:533](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/types/types.ts#L533)

#### chatId

> **chatId**: `string`

#### chatName

> **chatName**: `string`

#### sender

> **sender**: `string`

#### senderContactName?

> `optional` **senderContactName**: `string`

#### senderName

> **senderName**: `string`

***

### timestamp

> **timestamp**: `number`

Defined in: [src/types/types.ts:531](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/types/types.ts#L531)

***

### typeWebhook

> **typeWebhook**: `"outgoingAPIMessageReceived"` \| `"outgoingMessageReceived"` \| `"incomingMessageReceived"`

Defined in: [src/types/types.ts:525](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/types/types.ts#L525)
