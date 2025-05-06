[**GREEN-API Integration Platform**](README.md)

***

# GREEN-API Integration Platform

## Classes

### Core

- [BaseAdapter](classes/BaseAdapter.md)
- [GreenApiLogger](classes/GreenApiLogger.md)

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

- [AddGroupParticipant](interfaces/AddGroupParticipant.md)
- [AddGroupParticipantResponse](interfaces/AddGroupParticipantResponse.md)
- [ArchiveChat](interfaces/ArchiveChat.md)
- [BaseInstance](interfaces/BaseInstance.md)
- [BaseJournalMessage](interfaces/BaseJournalMessage.md)
- [BaseMessage](interfaces/BaseMessage.md)
- [BaseRequest](interfaces/BaseRequest.md)
- [BaseUser](interfaces/BaseUser.md)
- [ButtonData](interfaces/ButtonData.md)
- [ButtonsMessageData](interfaces/ButtonsMessageData.md)
- [CallButtonData](interfaces/CallButtonData.md)
- [CheckWhatsapp](interfaces/CheckWhatsapp.md)
- [CheckWhatsappResponse](interfaces/CheckWhatsappResponse.md)
- [ClearMessagesQueue](interfaces/ClearMessagesQueue.md)
- [Contact](interfaces/Contact.md)
- [ContactInfo](interfaces/ContactInfo.md)
- [ContactMessageData](interfaces/ContactMessageData.md)
- [ContactsArrayMessageData](interfaces/ContactsArrayMessageData.md)
- [CreateGroup](interfaces/CreateGroup.md)
- [CreateGroupResponse](interfaces/CreateGroupResponse.md)
- [DeletedMessageData](interfaces/DeletedMessageData.md)
- [EditedMessageData](interfaces/EditedMessageData.md)
- [ExtendedTextMessageData](interfaces/ExtendedTextMessageData.md)
- [FileMessageData](interfaces/FileMessageData.md)
- [ForwardableMessage](interfaces/ForwardableMessage.md)
- [ForwardMessages](interfaces/ForwardMessages.md)
- [ForwardMessagesResponse](interfaces/ForwardMessagesResponse.md)
- [GetAuthorizationCode](interfaces/GetAuthorizationCode.md)
- [GetAvatar](interfaces/GetAvatar.md)
- [GetAvatarResponse](interfaces/GetAvatarResponse.md)
- [GetChatHistory](interfaces/GetChatHistory.md)
- [GetGroupData](interfaces/GetGroupData.md)
- [GetMessage](interfaces/GetMessage.md)
- [GroupData](interfaces/GroupData.md)
- [GroupInviteMessageData](interfaces/GroupInviteMessageData.md)
- [GroupParticipant](interfaces/GroupParticipant.md)
- [IncomingCallWebhook](interfaces/IncomingCallWebhook.md)
- [IncomingJournalFields](interfaces/IncomingJournalFields.md)
- [Instance](interfaces/Instance.md)
- [LeaveGroup](interfaces/LeaveGroup.md)
- [LeaveGroupResponse](interfaces/LeaveGroupResponse.md)
- [ListMessageData](interfaces/ListMessageData.md)
- [ListRowData](interfaces/ListRowData.md)
- [ListSectionData](interfaces/ListSectionData.md)
- [LocationMessageData](interfaces/LocationMessageData.md)
- [Logout](interfaces/Logout.md)
- [MediaMessage](interfaces/MediaMessage.md)
- [MessageWebhook](interfaces/MessageWebhook.md)
- [OutgoingJournalFields](interfaces/OutgoingJournalFields.md)
- [OutgoingMessageStatusWebhook](interfaces/OutgoingMessageStatusWebhook.md)
- [PollMessageData](interfaces/PollMessageData.md)
- [PollOption](interfaces/PollOption.md)
- [PollUpdateMessageData](interfaces/PollUpdateMessageData.md)
- [PollVote](interfaces/PollVote.md)
- [Product](interfaces/Product.md)
- [ProductImageUrls](interfaces/ProductImageUrls.md)
- [ProductReviewStatus](interfaces/ProductReviewStatus.md)
- [QR](interfaces/QR.md)
- [QueueMessage](interfaces/QueueMessage.md)
- [QuickReplyButtonData](interfaces/QuickReplyButtonData.md)
- [ReactionMessageData](interfaces/ReactionMessageData.md)
- [ReadChat](interfaces/ReadChat.md)
- [ReadChatResponse](interfaces/ReadChatResponse.md)
- [Reboot](interfaces/Reboot.md)
- [RemoveAdmin](interfaces/RemoveAdmin.md)
- [RemoveAdminResponse](interfaces/RemoveAdminResponse.md)
- [RemoveGroupParticipant](interfaces/RemoveGroupParticipant.md)
- [RemoveGroupParticipantResponse](interfaces/RemoveGroupParticipantResponse.md)
- [SendContact](interfaces/SendContact.md)
- [SendFileByUpload](interfaces/SendFileByUpload.md)
- [SendFileByUploadResponse](interfaces/SendFileByUploadResponse.md)
- [SendFileByUrl](interfaces/SendFileByUrl.md)
- [SendLocation](interfaces/SendLocation.md)
- [SendMessage](interfaces/SendMessage.md)
- [SendPoll](interfaces/SendPoll.md)
- [SendResponse](interfaces/SendResponse.md)
- [SetDisappearingChat](interfaces/SetDisappearingChat.md)
- [SetDisappearingChatResponse](interfaces/SetDisappearingChatResponse.md)
- [SetGroupAdmin](interfaces/SetGroupAdmin.md)
- [SetGroupAdminResponse](interfaces/SetGroupAdminResponse.md)
- [SetGroupPicture](interfaces/SetGroupPicture.md)
- [SetGroupPictureResponse](interfaces/SetGroupPictureResponse.md)
- [SetProfilePicture](interfaces/SetProfilePicture.md)
- [SetSettingsResponse](interfaces/SetSettingsResponse.md)
- [Settings](interfaces/Settings.md)
- [StateInstance](interfaces/StateInstance.md)
- [StateInstanceWebhook](interfaces/StateInstanceWebhook.md)
- [TemplateButtonData](interfaces/TemplateButtonData.md)
- [TemplateMessageData](interfaces/TemplateMessageData.md)
- [TextMessageData](interfaces/TextMessageData.md)
- [UnarchiveChat](interfaces/UnarchiveChat.md)
- [UpdateGroupName](interfaces/UpdateGroupName.md)
- [UpdateGroupNameResponse](interfaces/UpdateGroupNameResponse.md)
- [UploadFile](interfaces/UploadFile.md)
- [UrlButtonData](interfaces/UrlButtonData.md)
- [WaSettings](interfaces/WaSettings.md)

## Type Aliases

- [BaseIncomingJournalMessage](type-aliases/BaseIncomingJournalMessage.md)
- [BaseJournalResponse](type-aliases/BaseJournalResponse.md)
- [BaseOutgoingJournalMessage](type-aliases/BaseOutgoingJournalMessage.md)
- [CallStatus](type-aliases/CallStatus.md)
- [ContactType](type-aliases/ContactType.md)
- [EphemeralExpiration](type-aliases/EphemeralExpiration.md)
- [GreenApiWebhook](type-aliases/GreenApiWebhook.md)
- [IncomingJournalResponse](type-aliases/IncomingJournalResponse.md)
- [InstanceState](type-aliases/InstanceState.md)
- [JournalMessageData](type-aliases/JournalMessageData.md)
- [JournalResponse](type-aliases/JournalResponse.md)
- [Message](type-aliases/Message.md)
- [MessageType](type-aliases/MessageType.md)
- [OutgoingJournalResponse](type-aliases/OutgoingJournalResponse.md)
- [OutgoingMessageStatus](type-aliases/OutgoingMessageStatus.md)
- [QueueMessageBody](type-aliases/QueueMessageBody.md)
- [QueueMessageType](type-aliases/QueueMessageType.md)
- [QuotedMessage](type-aliases/QuotedMessage.md)
- [WebhookMessageData](type-aliases/WebhookMessageData.md)
- [WebhookType](type-aliases/WebhookType.md)

## Functions

- [extractPhoneNumberFromVCard](functions/extractPhoneNumberFromVCard.md)
- [formatPhoneNumber](functions/formatPhoneNumber.md)
- [generateRandomToken](functions/generateRandomToken.md)
- [isValidSettingValue](functions/isValidSettingValue.md)
- [validateAndCleanSettings](functions/validateAndCleanSettings.md)
