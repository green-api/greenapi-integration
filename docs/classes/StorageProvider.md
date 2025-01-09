[**GREEN-API Integration Platform**](../README.md)

***

[GREEN-API Integration Platform](../globals.md) / StorageProvider

# Class: `abstract` StorageProvider\<TUser, TInstance, TUserCreate, TUserUpdate\>

Defined in: [src/core/storage-provider.ts:24](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/storage-provider.ts#L24)

Abstract class for managing instance and user data storage.
Implement this class to define how your integration stores and retrieves data.

## Example

```typescript
class PostgresStorage extends StorageProvider<User, Instance> {
  async createInstance(instance: Instance, userId: bigint, settings?: Settings) {
    return prisma.instance.create({
      data: { ...instance, userId, settings }
    });
  }
}
```

## Type Parameters

• **TUser** *extends* [`BaseUser`](../interfaces/BaseUser.md) = [`BaseUser`](../interfaces/BaseUser.md)

User entity type, extends BaseUser

• **TInstance** *extends* [`Instance`](../interfaces/Instance.md) = [`Instance`](../interfaces/Instance.md)

Instance entity type, extends Instance

• **TUserCreate** *extends* `Record`\<`string`, `any`\> = `any`

Shape of data required to create a user

• **TUserUpdate** *extends* `Record`\<`string`, `any`\> = `any`

Shape of data allowed for user updates

## Constructors

### new StorageProvider()

> **new StorageProvider**\<`TUser`, `TInstance`, `TUserCreate`, `TUserUpdate`\>(): [`StorageProvider`](StorageProvider.md)\<`TUser`, `TInstance`, `TUserCreate`, `TUserUpdate`\>

#### Returns

[`StorageProvider`](StorageProvider.md)\<`TUser`, `TInstance`, `TUserCreate`, `TUserUpdate`\>

## Methods

### createInstance()

> `abstract` **createInstance**(`instance`, `userId`, `settings`?): `Promise`\<`TInstance`\>

Defined in: [src/core/storage-provider.ts:38](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/storage-provider.ts#L38)

Creates a new instance in storage.

#### Parameters

##### instance

[`Instance`](../interfaces/Instance.md)

The instance data to store

##### userId

ID of the user who owns this instance

`number` | `bigint`

##### settings?

[`Settings`](../interfaces/Settings.md)

Optional GREEN-API settings for the instance

#### Returns

`Promise`\<`TInstance`\>

Promise resolving to the created instance

***

### createUser()

> `abstract` **createUser**(`data`): `Promise`\<`TUser`\>

Defined in: [src/core/storage-provider.ts:62](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/storage-provider.ts#L62)

Creates a new user in storage.

#### Parameters

##### data

`TUserCreate`

User data matching TUserCreate type

#### Returns

`Promise`\<`TUser`\>

Promise resolving to the created user

***

### findUser()

> `abstract` **findUser**(`identifier`): `Promise`\<`null` \| `TUser`\>

Defined in: [src/core/storage-provider.ts:70](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/storage-provider.ts#L70)

Finds a user by identifier (usually email or username).

#### Parameters

##### identifier

`string`

The identifier to look up

#### Returns

`Promise`\<`null` \| `TUser`\>

Promise resolving to the user or null if not found

***

### getInstance()

> `abstract` **getInstance**(`idInstance`): `Promise`\<`null` \| `TInstance`\>

Defined in: [src/core/storage-provider.ts:46](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/storage-provider.ts#L46)

Retrieves an instance by its ID.

#### Parameters

##### idInstance

The instance ID to look up

`number` | `bigint`

#### Returns

`Promise`\<`null` \| `TInstance`\>

Promise resolving to the instance or null if not found

***

### removeInstance()

> `abstract` **removeInstance**(`instanceId`): `Promise`\<`TInstance`\>

Defined in: [src/core/storage-provider.ts:54](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/storage-provider.ts#L54)

Removes an instance from storage.

#### Parameters

##### instanceId

ID of the instance to remove

`number` | `bigint`

#### Returns

`Promise`\<`TInstance`\>

Promise resolving to the removed instance

***

### updateUser()

> `abstract` **updateUser**(`identifier`, `data`): `Promise`\<`TUser`\>

Defined in: [src/core/storage-provider.ts:79](https://github.com/green-api/greenapi-integration/blob/26b7312501b16e05fb46a2946b8bfa77b8bc003e/src/core/storage-provider.ts#L79)

Updates an existing user's data.

#### Parameters

##### identifier

`string`

The identifier of the user to update

##### data

`Partial`\<`TUserUpdate`\>

Partial update data matching TUserUpdate type

#### Returns

`Promise`\<`TUser`\>

Promise resolving to the updated user
