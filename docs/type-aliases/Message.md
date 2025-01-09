[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / Message

# Type Alias: Message

> **Message**: `object` & [`BaseMessage`](../interfaces/BaseMessage.md) \| `object` & [`BaseMessage`](../interfaces/BaseMessage.md) \| `object` & [`BaseMessage`](../interfaces/BaseMessage.md) \| `object` & [`BaseMessage`](../interfaces/BaseMessage.md) \| `object` & [`BaseMessage`](../interfaces/BaseMessage.md) \| `object` & [`BaseMessage`](../interfaces/BaseMessage.md) \| \{ `chatId`: `string`; `chatIdFrom`: `string`; `messages`: `string`[]; `type`: `"forward"`; \}

Defined in: [src/types/types.ts:23](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L23)

Union type representing all possible message formats that can be sent through GREEN-API.
Each message type has its own specific structure and required fields.
