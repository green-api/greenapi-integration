[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / WebhookMessageData

# Type Alias: WebhookMessageData

> **WebhookMessageData**: \{ `textMessageData`: [`TextMessageData`](../interfaces/TextMessageData.md); `typeMessage`: `"textMessage"`; \} \| \{ `extendedTextMessageData`: [`ExtendedTextMessageData`](../interfaces/ExtendedTextMessageData.md); `typeMessage`: `"extendedTextMessage"`; \} \| \{ `fileMessageData`: [`FileMessageData`](../interfaces/FileMessageData.md); `typeMessage`: `"imageMessage"` \| `"videoMessage"` \| `"documentMessage"` \| `"audioMessage"`; \} \| \{ `locationMessageData`: [`LocationMessageData`](../interfaces/LocationMessageData.md); `typeMessage`: `"locationMessage"`; \} \| \{ `contactMessageData`: [`ContactMessageData`](../interfaces/ContactMessageData.md); `typeMessage`: `"contactMessage"`; \} \| \{ `pollMessageData`: [`PollMessageData`](../interfaces/PollMessageData.md); `typeMessage`: `"pollMessage"`; \} \| \{ `pollMessageData`: [`PollUpdateMessageData`](../interfaces/PollUpdateMessageData.md); `typeMessage`: `"pollUpdateMessage"`; \}

Defined in: [src/types/types.ts:245](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L245)
