import { StorageProvider, BaseUser, BaseInstance, Settings } from 'greenapi-integration';

export class SimpleStorage extends StorageProvider {
    private users: Map<string, BaseUser> = new Map();
    private instances: Map<number, BaseInstance> = new Map();

    async createInstance(instance: BaseInstance, userId: bigint, settings?: Settings): Promise<BaseInstance> {
        this.instances.set(Number(instance.idInstance), {
            ...instance,
            settings: settings || {}
        });
        return instance;
    }

    async getInstance(idInstance: number): Promise<BaseInstance | null> {
        return this.instances.get(idInstance) || null;
    }

    async removeInstance(instanceId: number): Promise<BaseInstance> {
        const instance = this.instances.get(instanceId);
        if (!instance) throw new Error('Instance not found');
        this.instances.delete(instanceId);
        return instance;
    }

    async createUser(data: any): Promise<BaseUser> {
        const user = { id: Date.now(), ...data };
        this.users.set(data.email, user);
        return user;
    }

    async findUser(identifier: string): Promise<BaseUser | null> {
        return this.users.get(identifier) || null;
    }

    async updateUser(identifier: string, data: any): Promise<BaseUser> {
        const user = await this.findUser(identifier);
        if (!user) throw new Error('User not found');
        const updated = { ...user, ...data };
        this.users.set(identifier, updated);
        return updated;
    }
}
