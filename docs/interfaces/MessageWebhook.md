[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / MessageWebhook

# Interface: MessageWebhook

Defined in: [src/types/types.ts:354](https://github.com/green-api/greenapi-integration/blob/20ab1c18eae4ff2cd48cede03d005dd7127abc0b/src/types/types.ts#L354)

## Properties

### idMessage

> **idMessage**: `string`

Defined in: [src/types/types.ts:362](https://github.com/green-api/greenapi-integration/blob/20ab1c18eae4ff2cd48cede03d005dd7127abc0b/src/types/types.ts#L362)

***

### instanceData

> **instanceData**: `object`

Defined in: [src/types/types.ts:356](https://github.com/green-api/greenapi-integration/blob/20ab1c18eae4ff2cd48cede03d005dd7127abc0b/src/types/types.ts#L356)

#### idInstance

> **idInstance**: `number`

#### typeInstance

> **typeInstance**: `string`

#### wid

> **wid**: `string`

***

### messageData

> **messageData**: [`WebhookMessageData`](../type-aliases/WebhookMessageData.md) & `object`

Defined in: [src/types/types.ts:370](https://github.com/green-api/greenapi-integration/blob/20ab1c18eae4ff2cd48cede03d005dd7127abc0b/src/types/types.ts#L370)

#### Type declaration

##### quotedMessage?

> `optional` **quotedMessage**: QuotedMessage \| undefined

***

### senderData

> **senderData**: `object`

Defined in: [src/types/types.ts:363](https://github.com/green-api/greenapi-integration/blob/20ab1c18eae4ff2cd48cede03d005dd7127abc0b/src/types/types.ts#L363)

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

Defined in: [src/types/types.ts:361](https://github.com/green-api/greenapi-integration/blob/20ab1c18eae4ff2cd48cede03d005dd7127abc0b/src/types/types.ts#L361)

***

### typeWebhook

> **typeWebhook**: `"outgoingAPIMessageReceived"` \| `"outgoingMessageReceived"` \| `"incomingMessageReceived"`

Defined in: [src/types/types.ts:355](https://github.com/green-api/greenapi-integration/blob/20ab1c18eae4ff2cd48cede03d005dd7127abc0b/src/types/types.ts#L355)
