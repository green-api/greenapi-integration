[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / validateAndCleanSettings

# Function: validateAndCleanSettings()

> **validateAndCleanSettings**(`settings`): [`Settings`](../interfaces/Settings.md)

Defined in: [src/utils/helpers.ts:110](https://github.com/green-api/greenapi-integration/blob/1e2009040b9fbee0c78f6935b3e8b1d1b6550313/src/utils/helpers.ts#L110)

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
