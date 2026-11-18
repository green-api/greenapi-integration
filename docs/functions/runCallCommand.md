[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / runCallCommand

# Function: runCallCommand()

> **runCallCommand**(`client`, `command`): `Promise`\<[`CallIdResponse`](../interfaces/CallIdResponse.md)\>

Defined in: [src/core/call-commands.ts:84](https://github.com/green-api/greenapi-integration/blob/012488faf93e622e485ab4a513b22192561cd744/src/core/call-commands.ts#L84)

Runs a call command through GREEN-API.

## Parameters

### client

[`GreenApiClient`](../classes/GreenApiClient.md)

GREEN-API client of the instance

### command

[`CallCommand`](../type-aliases/CallCommand.md)

The call command

## Returns

`Promise`\<[`CallIdResponse`](../interfaces/CallIdResponse.md)\>

Promise resolving to the call ID

## Throws

If GREEN-API refuses the command
