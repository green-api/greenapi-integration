import { BaseInstance, BaseUser, Instance, Settings } from "../types/types";

export abstract class StorageProvider<
	TUser extends BaseUser = BaseUser,
	TInstance extends BaseInstance = Instance,
	TUserCreate extends Record<string, any> = any,
	TUserUpdate extends Record<string, any> = any
> {
	abstract createInstance(instance: BaseInstance, userId: bigint | number, settings?: Settings): Promise<TInstance>;

	abstract getInstance(idInstance: number | bigint): Promise<TInstance | null>;

	abstract removeInstance(instanceId: number | bigint): Promise<TInstance>;

	abstract createUser(data: TUserCreate): Promise<TUser>;

	abstract findUser(identifier: string): Promise<TUser | null>;

	abstract updateUser(identifier: string, data: Partial<TUserUpdate>): Promise<TUser>;
}
