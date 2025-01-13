[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / Instance

# Interface: Instance

Defined in: [src/types/types.ts:16](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L16)

Extended instance interface that allows for additional platform-specific properties.
Use this when you need to store extra data with your instance.

## Extends

- `BaseInstance`

## Indexable

\[`key`: `string`\]: `any`

## Properties

### apiTokenInstance

> **apiTokenInstance**: `string`

Defined in: [src/types/types.ts:7](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L7)

#### Inherited from

`BaseInstance.apiTokenInstance`

***

### idInstance

> **idInstance**: `number` \| `bigint`

Defined in: [src/types/types.ts:6](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L6)

#### Inherited from

`BaseInstance.idInstance`

***

### settings?

> `optional` **settings**: [`Settings`](Settings.md) \| `Record`\<`string`, `any`\>

Defined in: [src/types/types.ts:9](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L9)

#### Inherited from

`BaseInstance.settings`

***

### stateInstance?

> `optional` **stateInstance**: [`InstanceState`](../type-aliases/InstanceState.md)

Defined in: [src/types/types.ts:8](https://github.com/green-api/greenapi-integration/blob/65d246f492cf703d5fb1135013cb3aaba77514dc/src/types/types.ts#L8)

#### Inherited from

`BaseInstance.stateInstance`
