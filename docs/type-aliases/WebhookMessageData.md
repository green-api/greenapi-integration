[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / WebhookMessageData

# Type Alias: WebhookMessageData

> **WebhookMessageData**: \{ `textMessageData`: [`TextMessageData`](../interfaces/TextMessageData.md); `typeMessage`: `"textMessage"`; \} \| \{ `extendedTextMessageData`: [`ExtendedTextMessageData`](../interfaces/ExtendedTextMessageData.md); `typeMessage`: `"extendedTextMessage"`; \} \| \{ `fileMessageData`: [`FileMessageData`](../interfaces/FileMessageData.md); `typeMessage`: `"imageMessage"` \| `"videoMessage"` \| `"documentMessage"` \| `"audioMessage"`; \} \| \{ `locationMessageData`: [`LocationMessageData`](../interfaces/LocationMessageData.md); `typeMessage`: `"locationMessage"`; \} \| \{ `contactMessageData`: [`ContactMessageData`](../interfaces/ContactMessageData.md); `typeMessage`: `"contactMessage"`; \} \| \{ `pollMessageData`: [`PollMessageData`](../interfaces/PollMessageData.md); `typeMessage`: `"pollMessage"`; \} \| \{ `pollMessageData`: [`PollUpdateMessageData`](../interfaces/PollUpdateMessageData.md); `typeMessage`: `"pollUpdateMessage"`; \} \| \{ `messageData`: [`ContactsArrayMessageData`](../interfaces/ContactsArrayMessageData.md); `typeMessage`: `"contactsArrayMessage"`; \}

Defined in: [src/types/types.ts:338](https://github.com/green-api/greenapi-integration/blob/0c6468d26acd573ad1def9f01a1af819fb76eb31/src/types/types.ts#L338)
