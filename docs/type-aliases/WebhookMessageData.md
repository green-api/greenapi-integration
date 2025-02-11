[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / WebhookMessageData

# Type Alias: WebhookMessageData

> **WebhookMessageData**: \{ `textMessageData`: [`TextMessageData`](../interfaces/TextMessageData.md); `typeMessage`: `"textMessage"`; \} \| \{ `extendedTextMessageData`: [`ExtendedTextMessageData`](../interfaces/ExtendedTextMessageData.md); `typeMessage`: `"extendedTextMessage"`; \} \| \{ `fileMessageData`: [`FileMessageData`](../interfaces/FileMessageData.md); `typeMessage`: `"imageMessage"` \| `"videoMessage"` \| `"documentMessage"` \| `"audioMessage"`; \} \| \{ `extendedTextMessageData`: [`ExtendedTextMessageData`](../interfaces/ExtendedTextMessageData.md); `quotedMessage`: [`QuotedMessage`](QuotedMessage.md); `typeMessage`: `"quotedMessage"`; \} \| \{ `locationMessageData`: [`LocationMessageData`](../interfaces/LocationMessageData.md); `typeMessage`: `"locationMessage"`; \} \| \{ `contactMessageData`: [`ContactMessageData`](../interfaces/ContactMessageData.md); `typeMessage`: `"contactMessage"`; \} \| \{ `pollMessageData`: [`PollMessageData`](../interfaces/PollMessageData.md); `typeMessage`: `"pollMessage"`; \} \| \{ `pollMessageData`: [`PollUpdateMessageData`](../interfaces/PollUpdateMessageData.md); `typeMessage`: `"pollUpdateMessage"`; \} \| \{ `messageData`: [`ContactsArrayMessageData`](../interfaces/ContactsArrayMessageData.md); `typeMessage`: `"contactsArrayMessage"`; \}

Defined in: [src/types/types.ts:344](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L344)
