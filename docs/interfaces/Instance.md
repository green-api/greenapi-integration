[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / Instance

# Interface: Instance

Defined in: [src/types/types.ts:15](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L15)

Extended instance interface that allows for additional platform-specific properties.
Use this when you need to store extra data with your instance.

## Extends

- `BaseInstance`

## Indexable

\[`key`: `string`\]: `any`

## Properties

### apiTokenInstance

> **apiTokenInstance**: `string`

Defined in: [src/types/types.ts:7](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L7)

#### Inherited from

`BaseInstance.apiTokenInstance`

***

### idInstance

> **idInstance**: `number` \| `bigint`

Defined in: [src/types/types.ts:6](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L6)

#### Inherited from

`BaseInstance.idInstance`

***

### settings?

> `optional` **settings**: [`Settings`](Settings.md)

Defined in: [src/types/types.ts:8](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/types/types.ts#L8)

#### Inherited from

`BaseInstance.settings`
