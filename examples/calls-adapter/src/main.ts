import { createServer } from "http";
import path from "path";
import express, { Response } from "express";
import {
	BaseGreenApiAuthGuard,
	CallsRelay,
	Instance,
	StorageProvider,
	toCallError,
} from "@green-api/greenapi-integration";
import { SampleService } from "./sample-service";
import { SampleStorage } from "./sample-storage";
import { SampleCallsAdapter } from "./sample-calls-adapter";
import { AnnouncementRobot } from "./announcement-robot";
import {
	DEFAULT_API_URL,
	DEFAULT_FFMPEG_PATH,
	DEFAULT_PORT,
	PHONE_CLIENT_MODULE,
	PHONE_CLIENT_PATH,
	RELAY_PATH,
	REQUEST_URL_BASE,
	REQUIRED_ENV,
} from "./defaults";

class WebhookGuard extends BaseGreenApiAuthGuard {
	constructor(storage: StorageProvider) {
		super(storage);
	}
}

process.loadEnvFile();
const missing = REQUIRED_ENV.filter((name) => !process.env[name]);
if (missing.length > 0) {
	throw new Error(`Set ${missing.join(", ")} in .env`);
}

const instance: Instance = {
	idInstance: Number(process.env.ID_INSTANCE),
	apiTokenInstance: process.env.API_TOKEN_INSTANCE as string,
	apiUrl: process.env.API_URL || DEFAULT_API_URL,
	settings: {webhookUrlToken: process.env.WEBHOOK_TOKEN},
};

const service = new SampleService();
const storage = new SampleStorage(instance);
const adapter = new SampleCallsAdapter(storage, service);
const guard = new WebhookGuard(storage);
const robot = new AnnouncementRobot(
	adapter,
	instance,
	service,
	process.env.ANNOUNCEMENT_FILE as string,
	process.env.FFMPEG_PATH || DEFAULT_FFMPEG_PATH,
);
const relay = new CallsRelay({
	authorize: async (request) => {
		const key = new URL(request.url ?? "", REQUEST_URL_BASE).searchParams.get("key");
		return key === process.env.PHONE_KEY ? instance : null;
	},
});

function sendError(res: Response, error: unknown): void {
	const callError = toCallError(error);
	service.log("error", `${callError.code}: ${callError.message}`);
	res.status(callError.statusCode).json({code: callError.code, message: callError.message});
}

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(PHONE_CLIENT_PATH, express.static(path.dirname(require.resolve(PHONE_CLIENT_MODULE))));

app.use("/api", (req, res, next) => {
	if (req.query.key !== process.env.PHONE_KEY) {
		res.status(401).json({code: "UNAUTHORIZED", message: "Open the page with ?key=<PHONE_KEY>"});
		return;
	}
	next();
});

app.post("/webhook", async (req, res) => {
	try {
		await guard.validateRequest(req);
	} catch {
		res.status(401).end();
		return;
	}
	try {
		await adapter.handleGreenApiWebhook(req.body);
	} catch (error) {
		service.log("error", error instanceof Error ? error.message : String(error));
	}
	res.status(200).end();
});

app.post("/api/calls", async (req, res) => {
	try {
		res.json(await adapter.handlePlatformCommand(req.body, instance.idInstance));
	} catch (error) {
		sendError(res, error);
	}
});

app.post("/api/robot", async (req, res) => {
	try {
		res.json({callId: await robot.call(String(req.body?.phone ?? ""))});
	} catch (error) {
		sendError(res, error);
	}
});

app.get("/api/log", (_req, res) => {
	res.json(service.list());
});

async function main(): Promise<void> {
	if (process.env.PUBLIC_URL) {
		await adapter.createGreenApiClient(instance).setSettings({
			webhookUrl: `${process.env.PUBLIC_URL.replace(/\/+$/, "")}/webhook`,
			webhookUrlToken: process.env.WEBHOOK_TOKEN,
			incomingWebhook: "yes",
			incomingCallWebhook: "yes",
			outgoingCallWebhook: "yes",
		});
	}

	const server = createServer(app);
	server.on("upgrade", (request, socket, head) => {
		if (request.url?.startsWith(RELAY_PATH)) {
			relay.handleUpgrade(request, socket, head);
		} else {
			socket.destroy();
		}
	});

	const port = Number(process.env.PORT) || DEFAULT_PORT;
	server.listen(port, () => {
		console.log(`Open http://localhost:${port}/?key=<PHONE_KEY>`);
	});
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
