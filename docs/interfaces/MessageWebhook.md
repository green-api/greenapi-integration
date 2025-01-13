[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / MessageWebhook

# Interface: MessageWebhook

Defined in: [src/types/types.ts:274](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L274)

## Properties

### idMessage

> **idMessage**: `string`

Defined in: [src/types/types.ts:282](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L282)

***

### instanceData

> **instanceData**: `object`

Defined in: [src/types/types.ts:276](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L276)

#### idInstance

> **idInstance**: `number`

#### typeInstance

> **typeInstance**: `string`

#### wid

> **wid**: `string`

***

### messageData

> **messageData**: [`WebhookMessageData`](../type-aliases/WebhookMessageData.md) & `object`

Defined in: [src/types/types.ts:290](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L290)

#### Type declaration

##### quotedMessage?

> `optional` **quotedMessage**: QuotedMessage \| undefined

***

### senderData

> **senderData**: `object`

Defined in: [src/types/types.ts:283](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L283)

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

Defined in: [src/types/types.ts:281](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L281)

***

### typeWebhook

> **typeWebhook**: `"outgoingAPIMessageReceived"` \| `"outgoingMessageReceived"` \| `"incomingMessageReceived"`

Defined in: [src/types/types.ts:275](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L275)
