[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / MessageWebhook

# Interface: MessageWebhook

Defined in: [src/types/types.ts:370](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/types/types.ts#L370)

## Properties

### idMessage

> **idMessage**: `string`

Defined in: [src/types/types.ts:378](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/types/types.ts#L378)

***

### instanceData

> **instanceData**: `object`

Defined in: [src/types/types.ts:372](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/types/types.ts#L372)

#### idInstance

> **idInstance**: `number`

#### typeInstance

> **typeInstance**: `string`

#### wid

> **wid**: `string`

***

### messageData

> **messageData**: [`WebhookMessageData`](../type-aliases/WebhookMessageData.md) & `object`

Defined in: [src/types/types.ts:386](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/types/types.ts#L386)

#### Type declaration

##### quotedMessage?

> `optional` **quotedMessage**: ((\{ stanzaId: string; participant: string; typeMessage: MessageType; \} & \{ typeMessage: "textMessage"; textMessage: string; \}) \| (\{ stanzaId: string; participant: string; typeMessage: MessageType; \} & \{ ...; \}) \| (\{ ...; \} & \{ ...; \}) \| (\{ ...; \} & \{ ...; \})) \| undefined

***

### senderData

> **senderData**: `object`

Defined in: [src/types/types.ts:379](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/types/types.ts#L379)

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

Defined in: [src/types/types.ts:377](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/types/types.ts#L377)

***

### typeWebhook

> **typeWebhook**: `"outgoingAPIMessageReceived"` \| `"outgoingMessageReceived"` \| `"incomingMessageReceived"`

Defined in: [src/types/types.ts:371](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/types/types.ts#L371)
