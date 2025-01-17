[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / formatPhoneNumber

# Function: formatPhoneNumber()

> **formatPhoneNumber**(`phone`, `chatType`): `string`

Defined in: [src/utils/helpers.ts:22](https://github.com/green-api/greenapi-integration/blob/20ab1c18eae4ff2cd48cede03d005dd7127abc0b/src/utils/helpers.ts#L22)

Formats a phone number into GREEN-API's expected format.
Removes all non-digit characters and adds @c.us or @g.us suffix.

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
