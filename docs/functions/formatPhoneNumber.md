[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / formatPhoneNumber

# Function: formatPhoneNumber()

> **formatPhoneNumber**(`phone`, `chatType`): `string`

Defined in: [src/utils/helpers.ts:21](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/utils/helpers.ts#L21)

Formats a phone number into GREEN-API's expected format.
Removes all non-digit characters and adds @c.us suffix.

## Parameters

### phone

`string`

The phone number to format

### chatType

The type of a chat, can be either "group" or "private"

`"group"` | `"private"`

## Returns

`string`

Formatted phone number with @c.us suffix

## Example

```ts
formatPhoneNumber('+1 (234) 567-8900')  // Returns '12345678900@c.us'
formatPhoneNumber('1234567890')          // Returns '1234567890@c.us'
```
