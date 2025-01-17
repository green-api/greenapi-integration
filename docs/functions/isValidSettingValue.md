[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / isValidSettingValue

# Function: isValidSettingValue()

> **isValidSettingValue**(`key`, `value`): `boolean`

Defined in: [src/utils/helpers.ts:70](https://github.com/green-api/greenapi-integration/blob/20ab1c18eae4ff2cd48cede03d005dd7127abc0b/src/utils/helpers.ts#L70)

Validates if a value is appropriate for a specific Settings interface key.
Checks type compatibility for numbers, strings, and yes/no enums.

## Parameters

### key

keyof [`Settings`](../interfaces/Settings.md)

The settings key to validate

### value

`any`

The value to check against the key's expected type

## Returns

`boolean`

Boolean indicating if the value is valid for the given key

## Example

```ts
isValidSettingValue('delaySendMessagesMilliseconds', 1000)     // Returns true
isValidSettingValue('outgoingWebhook', 'maybe')                // Returns false
isValidSettingValue('webhookUrl', 'https://example.com')       // Returns true
```
