[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / Instance

# Interface: Instance

Defined in: [src/types/types.ts:16](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L16)

Extended instance interface that allows for additional platform-specific properties.
Use this when you need to store extra data with your instance.

## Extends

- [`BaseInstance`](BaseInstance.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### apiTokenInstance

> **apiTokenInstance**: `string`

Defined in: [src/types/types.ts:7](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L7)

#### Inherited from

[`BaseInstance`](BaseInstance.md).[`apiTokenInstance`](BaseInstance.md#apitokeninstance)

***

### idInstance

> **idInstance**: `number` \| `bigint`

Defined in: [src/types/types.ts:6](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L6)

#### Inherited from

[`BaseInstance`](BaseInstance.md).[`idInstance`](BaseInstance.md#idinstance)

***

### settings?

> `optional` **settings**: [`Settings`](Settings.md) \| `Record`\<`string`, `any`\>

Defined in: [src/types/types.ts:9](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L9)

#### Inherited from

[`BaseInstance`](BaseInstance.md).[`settings`](BaseInstance.md#settings)

***

### stateInstance?

> `optional` **stateInstance**: [`InstanceState`](../type-aliases/InstanceState.md)

Defined in: [src/types/types.ts:8](https://github.com/green-api/greenapi-integration/blob/62a96bf9bfbccb88022bc7b0859de19e8c48289f/src/types/types.ts#L8)

#### Inherited from

[`BaseInstance`](BaseInstance.md).[`stateInstance`](BaseInstance.md#stateinstance)
