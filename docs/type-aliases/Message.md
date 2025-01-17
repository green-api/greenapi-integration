[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / Message

# Type Alias: Message

> **Message**: `object` & [`BaseMessage`](../interfaces/BaseMessage.md) \| `object` & [`BaseMessage`](../interfaces/BaseMessage.md) \| `object` & [`BaseMessage`](../interfaces/BaseMessage.md) \| `object` & [`BaseMessage`](../interfaces/BaseMessage.md) \| `object` & [`BaseMessage`](../interfaces/BaseMessage.md) \| `object` & [`BaseMessage`](../interfaces/BaseMessage.md) \| \{ `chatId`: `string`; `chatIdFrom`: `string`; `messages`: `string`[]; `type`: `"forward"`; \}

Defined in: [src/types/types.ts:24](https://github.com/green-api/greenapi-integration/blob/20ab1c18eae4ff2cd48cede03d005dd7127abc0b/src/types/types.ts#L24)

Union type representing all possible message formats that can be sent through GREEN-API.
Each message type has its own specific structure and required fields.
