[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / generateRandomToken

# Function: generateRandomToken()

> **generateRandomToken**(`length`): `string`

Defined in: [src/utils/helpers.ts:36](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/utils/helpers.ts#L36)

Generates a cryptographically secure random token.

## Parameters

### length

`number` = `32`

Length of the token in bytes (default: 32)

## Returns

`string`

Hexadecimal string of the specified length

## Example

```ts
generateRandomToken()     // Returns a 64-character hex string (32 bytes)
generateRandomToken(16)   // Returns a 32-character hex string (16 bytes)
```
