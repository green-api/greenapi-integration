[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / MessageWebhook

# Interface: MessageWebhook

Defined in: [src/types/types.ts:374](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L374)

## Properties

### idMessage

> **idMessage**: `string`

Defined in: [src/types/types.ts:382](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L382)

***

### instanceData

> **instanceData**: `object`

Defined in: [src/types/types.ts:376](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L376)

#### idInstance

> **idInstance**: `number`

#### typeInstance

> **typeInstance**: `string`

#### wid

> **wid**: `string`

***

### messageData

> **messageData**: [`WebhookMessageData`](../type-aliases/WebhookMessageData.md) & `object`

Defined in: [src/types/types.ts:390](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L390)

#### Type declaration

##### quotedMessage?

> `optional` **quotedMessage**: QuotedMessage \| undefined

***

### senderData

> **senderData**: `object`

Defined in: [src/types/types.ts:383](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L383)

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

Defined in: [src/types/types.ts:381](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L381)

***

### typeWebhook

> **typeWebhook**: `"outgoingAPIMessageReceived"` \| `"outgoingMessageReceived"` \| `"incomingMessageReceived"`

Defined in: [src/types/types.ts:375](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L375)
