import { BaseUser, Instance } from "../types/types";

/**
 * Abstract class for managing instance and user data storage.
 * Implement this class to define how your integration stores and retrieves data.
 *
 * @category Storage
 * @typeParam TUser - User entity type, extends BaseUser
 * @typeParam TInstance - Instance entity type, extends Instance
 * @typeParam TUserCreate - Shape of data required to create a user
 * @typeParam TUserUpdate - Shape of data allowed for user updates
 *
 * @example
 * ```typescript
 * class PostgresStorage extends StorageProvider<User, Instance> {
 *   async createInstance(instance: Instance, userId: bigint, settings?: Settings) {
 *     return prisma.instance.create({
 *       data: { ...instance, userId, settings }
 *     });
 *   }
 * }
 * ```
 */
export abstract class StorageProvider<
	TUser extends BaseUser = BaseUser,
	TInstance extends Instance = Instance,
	TUserCreate extends Record<string, any> = any,
	TUserUpdate extends Record<string, any> = any
> {
	/**
	 * Creates a new instance in storage.
	 *
	 * @param instance - The instance data to store
	 * @returns Promise resolving to the created instance
	 */
	abstract createInstance(instance: Instance): Promise<TInstance>;

	/**
	 * Retrieves an instance by its ID.
	 *
	 * @param idInstance - The instance ID to look up
	 * @returns Promise resolving to the instance or null if not found
	 */
	abstract getInstance(idInstance: number | bigint): Promise<TInstance | null>;

	/**
	 * Removes an instance from storage.
	 *
	 * @param instanceId - ID of the instance to remove
	 * @returns Promise resolving to the removed instance
	 */
	abstract removeInstance(instanceId: number | bigint): Promise<TInstance>;

	/**
	 * Creates a new user in storage.
	 *
	 * @param data - User data matching TUserCreate type
	 * @returns Promise resolving to the created user
	 */
	abstract createUser(data: TUserCreate): Promise<TUser>;

	/**
	 * Finds a user by identifier (usually email or username).
	 *
	 * @param identifier - The identifier to look up
	 * @returns Promise resolving to the user or null if not found
	 */
	abstract findUser(identifier: string): Promise<TUser | null>;

	/**
	 * Updates an existing user's data.
	 *
	 * @param identifier - The identifier of the user to update
	 * @param data - Partial update data matching TUserUpdate type
	 * @returns Promise resolving to the updated user
	 */
	abstract updateUser(identifier: string, data: Partial<TUserUpdate>): Promise<TUser>;
}
