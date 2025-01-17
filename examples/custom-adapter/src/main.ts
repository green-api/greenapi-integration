import express from "express";
import bodyParser from "body-parser";
import { formatPhoneNumber, GreenApiClient } from "@green-api/greenapi-integration";
import { SimpleTransformer } from "./simple-transformer";
import { SimpleStorage } from "./simple-storage";
import { SimpleAdapter } from "./simple-adapter";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
	// Initialize the components
	const transformer = new SimpleTransformer();
	const storage = new SimpleStorage();
	const adapter = new SimpleAdapter(transformer, storage);

	// Configuration for both instances
	const visitorInstance = {
		idInstance: Number(process.env.VISITOR_ID_INSTANCE),
		apiTokenInstance: process.env.VISITOR_API_TOKEN!,
	};

	const agentInstance = {
		idInstance: Number(process.env.AGENT_ID_INSTANCE),
		apiTokenInstance: process.env.AGENT_API_TOKEN!,
	};
	console.log(visitorInstance, agentInstance);

	// Create visitor's GREEN-API client (for sending initial message)
	const visitorClient = new GreenApiClient(visitorInstance);

	// Set up agent instance
	console.log("Setting up agent instance...");
	const user = await adapter.createUser("agent@example.com", {
		email: "agent@example.com",
		name: "Agent",
	});

	const instance = await adapter.createInstance({
		idInstance: agentInstance.idInstance, apiTokenInstance: agentInstance.apiTokenInstance, settings: {
			webhookUrl: process.env.WEBHOOK_URL + "/webhook/green-api",
			webhookUrlToken: "your-secure-token",
			incomingWebhook: "yes",
		},
	}, user.email);

	console.log("Waiting 2 minutes for settings to apply...");
	await new Promise(resolve => setTimeout(resolve, 120000));
	console.log("Instance ready!");

	// Set up webhook server
	const app = express();
	app.use(bodyParser.json());

	// Handle GREEN-API webhooks
	app.post("/webhook/green-api", async (req, res) => {
		try {
			console.log("Received webhook from GREEN-API:", req.body);
			await adapter.handleGreenApiWebhook(req.body, ["incomingMessageReceived"]);
			res.status(200).json({status: "ok"});
		} catch (error) {
			console.error("Error handling webhook:", error);
			res.status(500).json({error: "Internal server error"});
		}
	});

	// Start the server
	const port = Number(process.env.PORT) || 3000;
	app.listen(port, () => {
		console.log(`Webhook server listening on port ${port}`);
	});

	// Send initial message from visitor
	console.log("Sending initial message from visitor...");
	await visitorClient.sendMessage({
		chatId: formatPhoneNumber(process.env.AGENT_PHONE_NUMBER!),
		message: "Hello! This is a test message from a visitor.",
		type: "text",
	});

	console.log("Initial message sent! Check the agent WhatsApp app to see the response.");
}

main().catch(console.error);
