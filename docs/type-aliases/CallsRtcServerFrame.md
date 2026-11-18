[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / CallsRtcServerFrame

# Type Alias: CallsRtcServerFrame

> **CallsRtcServerFrame** = \{ `state`: [`CallState`](../interfaces/CallState.md); `type`: `"state"`; \} \| \{ `answer`: \{ `sdp`: `string`; `type`: `"answer"`; \}; `type`: `"answer"`; \} \| \{ `candidate`: \{ `candidate`: `string`; `sdpMid?`: `string` \| `null`; `sdpMLineIndex?`: `number` \| `null`; \}; `type`: `"ice-candidate"`; \} \| \{ `message`: `string`; `type`: `"error"`; \}

Defined in: [src/types/types.ts:1175](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/types/types.ts#L1175)
