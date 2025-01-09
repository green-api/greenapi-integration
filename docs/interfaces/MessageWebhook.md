[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / MessageWebhook

# Interface: MessageWebhook

Defined in: [src/types/types.ts:255](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L255)

## Properties

### idMessage

> **idMessage**: `string`

Defined in: [src/types/types.ts:263](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L263)

***

### instanceData

> **instanceData**: `object`

Defined in: [src/types/types.ts:257](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L257)

#### idInstance

> **idInstance**: `number`

#### typeInstance

> **typeInstance**: `string`

#### wid

> **wid**: `string`

***

### messageData

> **messageData**: [`WebhookMessageData`](../type-aliases/WebhookMessageData.md) & `object`

Defined in: [src/types/types.ts:271](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L271)

#### Type declaration

##### quotedMessage?

> `optional` **quotedMessage**: QuotedMessage \| undefined

***

### senderData

> **senderData**: `object`

Defined in: [src/types/types.ts:264](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L264)

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

Defined in: [src/types/types.ts:262](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L262)

***

### typeWebhook

> **typeWebhook**: `"incomingMessageReceived"` \| `"outgoingMessageReceived"` \| `"outgoingAPIMessageReceived"`

Defined in: [src/types/types.ts:256](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L256)
