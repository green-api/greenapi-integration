[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / validateAndCleanSettings

# Function: validateAndCleanSettings()

> **validateAndCleanSettings**(`settings`): [`Settings`](../interfaces/Settings.md)

Defined in: [src/utils/helpers.ts:110](https://github.com/green-api/greenapi-integration/blob/63683bb8d19b76d9e4ce6bd0a8121d8d2cf428af/src/utils/helpers.ts#L110)

Validates and cleans a settings object against the Settings interface.
Removes any properties that don't match the interface or have invalid values.

## Parameters

### settings

`any`

The settings object to validate and clean

## Returns

[`Settings`](../interfaces/Settings.md)

A new Settings object containing only valid properties and values

## Example

```ts
const input = {
  webhookUrl: 'https://example.com',
  outgoingWebhook: 'yes',
  invalidKey: 'value',
  delaySendMessagesMilliseconds: 'invalid'
};
validateAndCleanSettings(input)  // Returns { webhookUrl: 'https://example.com', outgoingWebhook: 'yes' }
```
