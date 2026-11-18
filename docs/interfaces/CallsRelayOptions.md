[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / CallsRelayOptions

# Interface: CallsRelayOptions

Defined in: [src/voice/calls-relay.ts:20](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/voice/calls-relay.ts#L20)

## Methods

### authorize()

> **authorize**(`request`): `Promise`\<[`Instance`](Instance.md) \| `null`\>

Defined in: [src/voice/calls-relay.ts:27](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/voice/calls-relay.ts#L27)

Finds the instance the browser phone may use, or null to refuse the connection.

#### Parameters

##### request

`IncomingMessage`

The WebSocket upgrade request from the browser

#### Returns

`Promise`\<[`Instance`](Instance.md) \| `null`\>

Promise resolving to the instance or null
