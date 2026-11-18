[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / describeCallEndReason

# Function: describeCallEndReason()

> **describeCallEndReason**(`reason?`): `string` \| `undefined`

Defined in: [src/core/call-events.ts:49](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/core/call-events.ts#L49)

Describes why a call ended, from the reason in the call state.

## Parameters

### reason?

`string`

The reason from the idle call state

## Returns

`string` \| `undefined`

Human-readable reason, or undefined when there is none
