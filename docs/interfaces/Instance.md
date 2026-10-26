[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / Instance

# Interface: Instance

Defined in: [src/types/types.ts:18](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L18)

Extended instance interface that allows for additional platform-specific properties.
Use this when you need to store extra data with your instance.

## Extends

- [`BaseInstance`](BaseInstance.md)

## Indexable

> \[`key`: `string`\]: `any`

## Properties

### apiTokenInstance

> **apiTokenInstance**: `string`

Defined in: [src/types/types.ts:7](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L7)

#### Inherited from

[`BaseInstance`](BaseInstance.md).[`apiTokenInstance`](BaseInstance.md#apitokeninstance)

***

### apiUrl?

> `optional` **apiUrl?**: `string` \| `null`

Defined in: [src/types/types.ts:10](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L10)

#### Inherited from

[`BaseInstance`](BaseInstance.md).[`apiUrl`](BaseInstance.md#apiurl)

***

### idInstance

> **idInstance**: `number` \| `bigint`

Defined in: [src/types/types.ts:6](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L6)

#### Inherited from

[`BaseInstance`](BaseInstance.md).[`idInstance`](BaseInstance.md#idinstance)

***

### mediaUrl?

> `optional` **mediaUrl?**: `string` \| `null`

Defined in: [src/types/types.ts:11](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L11)

#### Inherited from

[`BaseInstance`](BaseInstance.md).[`mediaUrl`](BaseInstance.md#mediaurl)

***

### settings?

> `optional` **settings?**: [`Settings`](Settings.md) \| `Record`\<`string`, `any`\> \| `null`

Defined in: [src/types/types.ts:9](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L9)

#### Inherited from

[`BaseInstance`](BaseInstance.md).[`settings`](BaseInstance.md#settings)

***

### stateInstance?

> `optional` **stateInstance?**: [`InstanceState`](../type-aliases/InstanceState.md) \| `null`

Defined in: [src/types/types.ts:8](https://github.com/green-api/greenapi-integration/blob/7c1a97bd2427657dbfaae76c191c9fbb984d05de/src/types/types.ts#L8)

#### Inherited from

[`BaseInstance`](BaseInstance.md).[`stateInstance`](BaseInstance.md#stateinstance)
