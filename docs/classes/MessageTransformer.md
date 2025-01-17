[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / MessageTransformer

# Class: `abstract` MessageTransformer\<TPlatformWebhook, TPlatformMessage\>

Defined in: [src/core/message-transformer.ts:31](https://github.com/green-api/greenapi-integration/blob/20ab1c18eae4ff2cd48cede03d005dd7127abc0b/src/core/message-transformer.ts#L31)

Abstract class for transforming messages between your platform's format and GREEN-API's format.
Implement this class to define how messages are converted between the two systems.

## Example

```typescript
class YourTransformer extends MessageTransformer<YourWebhook, YourMessage> {
  toPlatformMessage(webhook: GreenApiWebhook): YourMessage {
    return {
      recipient: webhook.senderData.sender,
      content: webhook.messageData.textMessageData?.textMessage || "",
    };
  }

  toGreenApiMessage(message: YourWebhook): Message {
    return {
      type: "text",
      chatId: formatPhoneNumber(message.from),
      message: message.content,
    };
  }
}
```

## Type Parameters

• **TPlatformWebhook**

Your platform's webhook message type

• **TPlatformMessage**

Your platform's outgoing message type

## Constructors

### new MessageTransformer()

> **new MessageTransformer**\<`TPlatformWebhook`, `TPlatformMessage`\>(): [`MessageTransformer`](MessageTransformer.md)\<`TPlatformWebhook`, `TPlatformMessage`\>

#### Returns

[`MessageTransformer`](MessageTransformer.md)\<`TPlatformWebhook`, `TPlatformMessage`\>

## Methods

### toGreenApiMessage()

> `abstract` **toGreenApiMessage**(`message`): [`Message`](../type-aliases/Message.md)

Defined in: [src/core/message-transformer.ts:50](https://github.com/green-api/greenapi-integration/blob/20ab1c18eae4ff2cd48cede03d005dd7127abc0b/src/core/message-transformer.ts#L50)

Transforms your platform's message format into GREEN-API's message format.
Implement this method to convert your platform's messages to WhatsApp format.

#### Parameters

##### message

`TPlatformWebhook`

The message in your platform's format

#### Returns

[`Message`](../type-aliases/Message.md)

Message formatted for GREEN-API

#### Throws

If the message format is invalid or unsupported

***

### toPlatformMessage()

> `abstract` **toPlatformMessage**(`webhook`): `TPlatformMessage`

Defined in: [src/core/message-transformer.ts:40](https://github.com/green-api/greenapi-integration/blob/20ab1c18eae4ff2cd48cede03d005dd7127abc0b/src/core/message-transformer.ts#L40)

Transforms a GREEN-API webhook into your platform's message format.
Implement this method to convert incoming WhatsApp messages to your platform's format.

#### Parameters

##### webhook

[`GreenApiWebhook`](../type-aliases/GreenApiWebhook.md)

The incoming webhook from GREEN-API

#### Returns

`TPlatformMessage`

Your platform's message format

#### Throws

If the webhook format is invalid or unsupported
