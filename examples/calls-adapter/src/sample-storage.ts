import { BaseUser, Instance, StorageProvider } from "@green-api/greenapi-integration";

export class SampleStorage extends StorageProvider {
	constructor(private readonly instance: Instance) {
		super();
	}

	async createInstance(instance: Instance): Promise<Instance> {
		return instance;
	}

	async getInstance(idInstance: number | bigint): Promise<Instance | null> {
		return BigInt(idInstance) === BigInt(this.instance.idInstance) ? this.instance : null;
	}

	async removeInstance(): Promise<Instance> {
		return this.instance;
	}

	async createUser(data: BaseUser): Promise<BaseUser> {
		return data;
	}

	async findUser(): Promise<BaseUser | null> {
		return null;
	}

	async updateUser(): Promise<BaseUser> {
		throw new Error("The sample does not store users");
	}
}
