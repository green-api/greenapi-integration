[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / QuotedMessage

# Type Alias: QuotedMessage

> **QuotedMessage**: `object` & \{ `textMessage`: `string`; `typeMessage`: `"textMessage"`; \} \| \{ `extendedTextMessage`: \{ `description`: `string`; `jpegThumbnail`: `string` \| `null`; `previewType`: `string`; `title`: `string`; \}; `textMessage`: `string`; `typeMessage`: `"extendedTextMessage"`; \} \| \{ `contact`: \{ `displayName`: `string`; `vcard`: `string`; \}; `typeMessage`: `"contactMessage"`; \} \| \{ `contacts`: `object`[]; `typeMessage`: `"contactsArrayMessage"`; \} \| \{ `location`: \{ `address`: `string`; `jpegThumbnail`: `string`; `latitude`: `number`; `longitude`: `number`; `nameLocation`: `string`; \}; `typeMessage`: `"locationMessage"`; \} \| \{ `caption`: `string`; `downloadUrl`: `string`; `jpegThumbnail`: `string`; `typeMessage`: `"imageMessage"` \| `"videoMessage"` \| `"documentMessage"` \| `"audioMessage"`; \} \| \{ `caption`: `string`; `downloadUrl`: `string`; `isAnimated`: `boolean`; `jpegThumbnail`: `string`; `typeMessage`: `"stickerMessage"`; \} \| \{ `buttons`: [`ButtonData`](../interfaces/ButtonData.md)[]; `contentText`: `string`; `footer`: `string`; `typeMessage`: `"buttonsMessage"`; \} \| \{ `buttonText`: `string`; `contentText`: `string`; `footer`: `string`; `sections`: [`ListSectionData`](../interfaces/ListSectionData.md)[]; `title`: `string`; `typeMessage`: `"listMessage"`; \} \| \{ `buttons`: [`TemplateButtonData`](../interfaces/TemplateButtonData.md)[]; `contentText`: `string`; `footer`: `string`; `typeMessage`: `"templateMessage"`; \} \| \{ `groupInviteMessageData`: [`GroupInviteMessageData`](../interfaces/GroupInviteMessageData.md); `typeMessage`: `"groupInviteMessage"`; \}

Defined in: [src/types/types.ts:335](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/types/types.ts#L335)

## Type declaration

### participant

> **participant**: `string`

### stanzaId

> **stanzaId**: `string`

### typeMessage

> **typeMessage**: [`MessageType`](MessageType.md)
