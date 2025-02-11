[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / QuotedMessage

# Type Alias: QuotedMessage

> **QuotedMessage**: `object` & \{ `textMessage`: `string`; `typeMessage`: `"textMessage"`; \} \| \{ `extendedTextMessage`: \{ `description`: `string`; `jpegThumbnail`: `string` \| `null`; `previewType`: `string`; `title`: `string`; \}; `textMessage`: `string`; `typeMessage`: `"extendedTextMessage"`; \} \| \{ `contact`: \{ `displayName`: `string`; `vcard`: `string`; \}; `typeMessage`: `"contactMessage"`; \} \| \{ `contacts`: `object`[]; `typeMessage`: `"contactsArrayMessage"`; \} \| \{ `location`: \{ `address`: `string`; `jpegThumbnail`: `string`; `latitude`: `number`; `longitude`: `number`; `nameLocation`: `string`; \}; `typeMessage`: `"locationMessage"`; \} \| \{ `caption`: `string`; `downloadUrl`: `string`; `jpegThumbnail`: `string`; `typeMessage`: `"imageMessage"` \| `"videoMessage"` \| `"documentMessage"` \| `"audioMessage"`; \}

Defined in: [src/types/types.ts:244](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L244)

## Type declaration

### participant

> **participant**: `string`

### stanzaId

> **stanzaId**: `string`

### typeMessage

> **typeMessage**: [`MessageType`](MessageType.md)
