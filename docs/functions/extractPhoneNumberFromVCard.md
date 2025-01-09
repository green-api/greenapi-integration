[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / extractPhoneNumberFromVCard

# Function: extractPhoneNumberFromVCard()

> **extractPhoneNumberFromVCard**(`vcard`): `string` \| `null`

Defined in: [src/utils/helpers.ts:51](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/utils/helpers.ts#L51)

Extracts a phone number from a vCard string format.
Supports various vCard formats and phone number notations.

## Parameters

### vcard

`string`

The vCard string containing contact information

## Returns

`string` \| `null`

The extracted phone number or null if not found

## Example

```ts
const vcard = `BEGIN:VCARD\nTEL:+1234567890\nEND:VCARD`;
extractPhoneNumberFromVCard(vcard)  // Returns '+1234567890'
```
