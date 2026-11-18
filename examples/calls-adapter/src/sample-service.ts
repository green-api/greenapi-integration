import { SERVICE_LOG_LIMIT } from "./defaults";

export interface ServiceEntry {
	time: string;
	kind: "call" | "error";
	text: string;
}

export class SampleService {
	private readonly entries: ServiceEntry[] = [];

	log(kind: ServiceEntry["kind"], text: string): void {
		this.entries.unshift({time: new Date().toISOString(), kind, text});
		this.entries.splice(SERVICE_LOG_LIMIT);
		console.log(`[service] ${kind}: ${text}`);
	}

	list(): ServiceEntry[] {
		return this.entries;
	}
}
