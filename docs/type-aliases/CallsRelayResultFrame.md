[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / CallsRelayResultFrame

# Type Alias: CallsRelayResultFrame

> **CallsRelayResultFrame** = \{ `callId?`: `string`; `iceServers?`: [`IceServer`](../interfaces/IceServer.md)[]; `id`: `number`; `type`: `"result"`; \} \| \{ `error`: \{ `code`: [`CallErrorCode`](CallErrorCode.md); `message`: `string`; \}; `id`: `number`; `type`: `"result"`; \}

Defined in: [src/types/types.ts:1192](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/types/types.ts#L1192)
