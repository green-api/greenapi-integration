[**GREEN-API Integration Platform**](README.md)

***

# GREEN-API Integration Platform

## Classes

### Core

- [BaseAdapter](classes/BaseAdapter.md)

### Client

- [GreenApiClient](classes/GreenApiClient.md)

### Storage

- [StorageProvider](classes/StorageProvider.md)

### Authentication

- [BaseGreenApiAuthGuard](classes/BaseGreenApiAuthGuard.md)

### Errors

- [AuthenticationError](classes/AuthenticationError.md)
- [BadRequestError](classes/BadRequestError.md)
- [IntegrationError](classes/IntegrationError.md)
- [NotFoundError](classes/NotFoundError.md)

### Transformer

- [MessageTransformer](classes/MessageTransformer.md)

## Interfaces

- [BaseMessage](interfaces/BaseMessage.md)
- [BaseRequest](interfaces/BaseRequest.md)
- [BaseUser](interfaces/BaseUser.md)
- [ContactMessageData](interfaces/ContactMessageData.md)
- [ExtendedTextMessageData](interfaces/ExtendedTextMessageData.md)
- [FileMessageData](interfaces/FileMessageData.md)
- [ForwardableMessage](interfaces/ForwardableMessage.md)
- [ForwardMessagesResponse](interfaces/ForwardMessagesResponse.md)
- [GetAuthorizationCode](interfaces/GetAuthorizationCode.md)
- [Instance](interfaces/Instance.md)
- [LocationMessageData](interfaces/LocationMessageData.md)
- [Logout](interfaces/Logout.md)
- [MediaMessage](interfaces/MediaMessage.md)
- [MessageWebhook](interfaces/MessageWebhook.md)
- [OutgoingMessageStatusWebhook](interfaces/OutgoingMessageStatusWebhook.md)
- [PollMessageData](interfaces/PollMessageData.md)
- [PollOption](interfaces/PollOption.md)
- [PollUpdateMessageData](interfaces/PollUpdateMessageData.md)
- [PollVote](interfaces/PollVote.md)
- [QR](interfaces/QR.md)
- [Reboot](interfaces/Reboot.md)
- [SendFileByUploadResponse](interfaces/SendFileByUploadResponse.md)
- [SendResponse](interfaces/SendResponse.md)
- [SetProfilePicture](interfaces/SetProfilePicture.md)
- [SetSettingsResponse](interfaces/SetSettingsResponse.md)
- [Settings](interfaces/Settings.md)
- [StateInstance](interfaces/StateInstance.md)
- [TextMessageData](interfaces/TextMessageData.md)
- [UploadFile](interfaces/UploadFile.md)
- [WaSettings](interfaces/WaSettings.md)

## Type Aliases

- [ForwardMessages](type-aliases/ForwardMessages.md)
- [GreenApiWebhook](type-aliases/GreenApiWebhook.md)
- [InstanceState](type-aliases/InstanceState.md)
- [Message](type-aliases/Message.md)
- [MessageType](type-aliases/MessageType.md)
- [OutgoingMessageStatus](type-aliases/OutgoingMessageStatus.md)
- [SendContact](type-aliases/SendContact.md)
- [SendFileByUpload](type-aliases/SendFileByUpload.md)
- [SendFileByUrl](type-aliases/SendFileByUrl.md)
- [SendLocation](type-aliases/SendLocation.md)
- [SendMessage](type-aliases/SendMessage.md)
- [SendMessageType](type-aliases/SendMessageType.md)
- [SendPoll](type-aliases/SendPoll.md)
- [WebhookMessageData](type-aliases/WebhookMessageData.md)

## Functions

- [extractPhoneNumberFromVCard](functions/extractPhoneNumberFromVCard.md)
- [formatPhoneNumber](functions/formatPhoneNumber.md)
- [generateRandomToken](functions/generateRandomToken.md)
