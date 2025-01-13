[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / generateRandomToken

# Function: generateRandomToken()

> **generateRandomToken**(`length`): `string`

Defined in: [src/utils/helpers.ts:37](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/utils/helpers.ts#L37)

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
