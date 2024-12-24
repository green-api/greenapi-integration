# Universal Integration Platform for GREEN-API

## Support links

[![Support](https://img.shields.io/badge/support@green--api.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:support@greenapi.com)
[![Support](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/greenapi_support_eng_bot)
[![Support](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/77273122366)

## Guides & News

[![Guides](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)](https://www.youtube.com/@greenapi-en)
[![News](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/green_api)
[![News](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/0029VaLj6J4LNSa2B5Jx6s3h)

- [Документация на русском языке](./README.ru.md)

A flexible integration platform designed to simplify the process of connecting GREEN-API's WhatsApp gateway with various
third-party services.

## Table of Contents

- [Installation](#installation)
- [Core Components](#core-components)
- [Developer Guide](#developer-guide)
- [Working Example](#working-example)
- [Real-World Examples](#real-world-examples)
- [Best Practices](#best-practices)

## Installation

```bash
npm install @green-api/greenapi-integration
```

## Core Components

### 1. BaseAdapter

The foundation of your integration. Handles message & instance management, and platform-specific logic.
The `BaseAdapter` internally uses `GreenApiClient` for all common operations, so in most cases, you don't need to use
GreenApiClient methods directly.

**When to use `BaseAdapter` vs `GreenApiClient`**:

✅ Use `BaseAdapter` methods for all standard operations (sending messages, handling webhooks, managing instances)

⚠️ Use `GreenApiClient` directly only for specialized operations not covered by BaseAdapter (like setProfilePicture,
getAuthorizationCode)

```typescript
abstract class BaseAdapter<TPlatformWebhook, TPlatformMessage> {
	public constructor(
		transformer: MessageTransformer<TPlatformWebhook, TPlatformMessage>,
		storage: StorageProvider
	);

	public abstract createPlatformClient(params: any): Promise<any>;

	public abstract sendToPlatform(message: TPlatformMessage, instance: TInstance): Promise<void>;
}
```

**Example of proper usage:**

```typescript
// ✅ CORRECT: Using BaseAdapter for standard operations
const adapter = new YourAdapter(transformer, storage);
await adapter.handlePlatformWebhook(webhook, instanceId);
await adapter.createInstance(instance, settings, userCred);
await adapter.sendMessage(transformedWebhook);

// ⚠️ ONLY IF NEEDED: Direct GreenApiClient usage for specialized operations
const client = new GreenApiClient(instance);
await client.setProfilePicture(fileBlob);
await client.getAuthorizationCode(phoneNumber);
```

### 2. MessageTransformer

Handles message format conversion between GREEN-API and your platform.

```typescript
abstract class MessageTransformer<TPlatformWebhook, TPlatformMessage> {
	abstract toPlatformMessage(webhook: IncomingGreenApiWebhook): TPlatformMessage;

	abstract toGreenApiMessage(message: TPlatformWebhook): Message;
}
```

### 3. StorageProvider

Interface for data persistence operations.

```typescript
abstract class StorageProvider<TUser extends BaseUser = BaseUser, TInstance extends BaseInstance = Instance> {
	abstract createInstance(instance: BaseInstance, userId: bigint | number, settings?: Settings): Promise<TInstance>;

	abstract getInstance(idInstance: number | bigint): Promise<TInstance | null>;

	abstract removeInstance(instanceId: number | bigint): Promise<TInstance>;

	abstract createUser(data: any): Promise<TUser>;

	abstract findUser(identifier: string): Promise<TUser | null>;

	abstract updateUser(identifier: string, data: any): Promise<TUser>;
}
```

### 4. BaseGreenApiAuthGuard

Handles webhook authentication for incoming GREEN-API requests.

```typescript
abstract class BaseGreenApiAuthGuard<T extends BaseRequest = BaseRequest> {
	constructor(protected storage: StorageProvider);

	// Validates incoming webhook requests
	async validateRequest(request: T): Promise<boolean>;
}
```

Example implementation of `BaseGreenApiAuthGuard`:

```typescript
class YourAuthGuard extends BaseGreenApiAuthGuard<YourRequest> {
	constructor(storage: StorageProvider) {
		super(storage);
	}
}

// Using with Express
app.post('/webhook', async (req, res) => {
	const guard = new YourAuthGuard(storage);
	try {
		await guard.validateRequest(req);
		// Process webhook
	} catch (error) {
		if (error instanceof AuthenticationError) {
			res.status(401).json({error: error.message});
			return;
		}
		res.status(500).json({error: 'Internal server error'});
	}
});
```

### 5. GreenApiClient

Direct interface to GREEN-API endpoints. While most operations should be handled through BaseAdapter, GreenApiClient can
be used directly for specialized operations.

```typescript
const client = new GreenApiClient({
	idInstance: 'your_instance_id',
	apiTokenInstance: 'your_token'
});

// Examples of specialized operations:
await client.setProfilePicture(fileBlob);
await client.getAuthorizationCode(phoneNumber);
await client.getQR();
```

## Developer Guide

### Project Structure

```
your-integration/
├── src/
│   ├── core/
│   │   ├── adapter.ts         # Your platform adapter
│   │   ├── transformer.ts     # Message transformer
│   │   ├── storage.ts         # Data storage implementation
│   │   └── router.ts          # Webhook endpoints
│   ├── types/
│   │   └── types.ts           # Platform-specific types
│   └── main.ts               # Main exports
├── package.json
└── tsconfig.json
```

### Implementation Steps

1. **Define Platform Types**

```typescript
// types/types.ts
export interface YourPlatformWebhook {
	id: string;
	from: string;
	message: string;
	timestamp: number;
	// Add other platform-specific fields
}

export interface YourPlatformMessage {
	recipient: string;
	content: string;
	// Add other platform-specific fields
}
```

2. **Create Message Transformer**

```typescript
// core/transformer.ts
import { MessageTransformer, Message, IncomingGreenApiWebhook } from '@green-api/greenapi-integration';
import { YourPlatformWebhook, YourPlatformMessage } from '../types/types';

export class YourTransformer extends MessageTransformer<YourPlatformWebhook, YourPlatformMessage> {
	toPlatformMessage(webhook: IncomingGreenApiWebhook): YourPlatformMessage {
		// Transform GREEN-API webhook to your platform format
		return {
			recipient: webhook.senderData.sender,
			content: webhook.messageData.textMessageData?.textMessage || '',
		};
	}

	toGreenApiMessage(message: YourPlatformWebhook): Message {
		// Transform your platform webhook to GREEN-API format
		return {
			type: 'text',
			chatId: message.from,
			message: message.message,
		};
	}
}
```

3. **Implement Storage**

```typescript
// core/storage.ts
import { StorageProvider, BaseUser, BaseInstance, Settings } from '@green-api/greenapi-integration';
import { PrismaClient } from '@prisma/client'; // Or your database client

export class YourStorage extends StorageProvider {
	private db: PrismaClient;

	constructor() {
		this.db = new PrismaClient();
	}

	async createInstance(instance: BaseInstance, userId: bigint, settings?: Settings) {
		return this.db.instance.create({
			data: {
				idInstance: instance.idInstance,
				apiTokenInstance: instance.apiTokenInstance,
				userId,
				settings: settings || {},
			},
		});
	}

	// Implement other required methods
}
```

4. **Create Platform Adapter**

```typescript
// core/adapter.ts
import { BaseAdapter, BaseInstance } from '@green-api/greenapi-integration';
import { YourPlatformClient } from 'your-platform-sdk';
import { YourPlatformWebhook, YourPlatformMessage } from '../types/types';

export class YourAdapter extends BaseAdapter<YourPlatformWebhook, YourPlatformMessage> {
	async createPlatformClient(config: { apiKey: string, apiUrl: string }) {
		return new YourPlatformClient({
			baseUrl: config.apiUrl,
			apiKey: config.apiKey,
		});
	}

	async sendToPlatform(message: YourPlatformMessage, instance: BaseInstance) {
		const client = await this.createPlatformClient(instance.config);
		await client.sendMessage(message);
	}
}
```

5. **Implement Webhook Controller**

```typescript
// core/webhook.ts
import express from 'express';
import { YourAdapter } from '../core/adapter';
import { YourTransformer } from '../core/transformer';
import { YourStorage } from '../core/storage';

const router = express.Router();
const storage = new YourStorage();
const transformer = new YourTransformer();
const adapter = new YourAdapter(transformer, storage);

class WebhookGuard extends BaseGreenApiAuthGuard {
	constructor(storage: StorageProvider) {
		super(storage);
	}
}

const guard = new WebhookGuard(storage);

// Webhook endpoints
router.post('/green-api', async (req, res) => {
	try {
		// Validate webhook first
		await guard.validateRequest(req);

		// Process webhook if validation passed
		// As the second parameter, specfify the types of webhooks to be processed (otherwise skipped)
		await adapter.handleGreenApiWebhook(req.body, ['incomingMessageReceived']);
		res.status(200).json({status: 'ok'});
	} catch (error) {
		if (error instanceof AuthenticationError) {
			res.status(401).json({error: error.message});
			return;
		}
		console.error('Webhook error:', error);
		res.status(500).json({error: 'Internal server error'});
	}
});

router.post('/platform', async (req, res) => {
	try {
		const instanceId = req.query.instanceId;
		await adapter.handlePlatformWebhook(req.body, instanceId);
		res.status(200).json({status: 'ok'});
	} catch (error) {
		console.error('Platform webhook error:', error);
		res.status(500).json({error: 'Internal server error'});
	}
});

router.post('/instance', async (req, res) => {
	try {
		const {idInstance, apiTokenInstance, userEmail} = req.body;

		if (!idInstance || !apiTokenInstance || !userEmail) {
			throw new BadRequestError('Required fields missing');
		}

		const instance = await adapter.createInstance({
			idInstance: Number(idInstance),
			apiTokenInstance
		}, {
			webhookUrl: `${process.env.APP_URL}/webhook/green-api`,
			webhookUrlToken: `token_${Date.now()}`, // In production, use a secure token generator
			incomingWebhook: 'yes'
		}, userEmail);

		res.status(200).json({
			status: 'ok',
			data: instance,
			message: 'Instance created successfully. Please wait 2 minutes for settings to apply.'
		});

	} catch (error) {
		console.error('Instance creation error:', error);
		res.status(500).json({error: 'Failed to create instance'});
	}
});

export default router;
```

6. **Create Application Entry Point**

```typescript
// main.ts
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import webhookRouter from './controllers/webhook';
import { YourAdapter } from './core/adapter';
import { YourTransformer } from './core/transformer';
import { YourStorage } from './core/storage';

// Load environment variables
dotenv.config();

async function bootstrap() {
	// Initialize components
	const storage = new YourStorage();
	const transformer = new YourTransformer();
	const adapter = new YourAdapter(transformer, storage);

	// Create Express application
	const app = express();
	app.use(bodyParser.json());

	// Set up webhook routes
	app.use('/webhook', webhookRouter);

	// Start server
	const port = process.env.PORT || 3000;
	app.listen(port, () => {
		console.log(`Server running on port ${port}`);
	});

	console.log('Integration platform ready!');
}

// Handle errors
bootstrap();
```

Or with NestJS:

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	app.use(helmet());
	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
```

### Publishing Your Integration

1. **Prepare package.json**

```json
{
  "name": "greenapi-integration-yourplatform",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  },
  "dependencies": {
    "@green-api/greenapi-integration": "^1.0.0",
    "@prisma/client": "^5.0.0",
    "express": "^4.18.2"
    // other dependencies
  }
}
```

2. **Build and Publish**

```bash
npm run build
npm publish
```

## Working Example

Check out the `/examples/custom-adapter` directory for a complete working example showing:

- Two-way message flow between WhatsApp and a custom platform
- Webhook handling
- Instance setup and configuration
- Message transformation
- Error handling

### Running the Example

1. Clone the repository
2. Update .env with your GREEN-API credentials:

```env
VISITOR_ID_INSTANCE=your_visitor_instance_id
VISITOR_API_TOKEN=your_visitor_instance_token
AGENT_ID_INSTANCE=your_agent_instance_id
AGENT_API_TOKEN=your_agent_instance_token
AGENT_PHONE_NUMBER=your_agent_phone_number
WEBHOOK_URL=your_webhook_url
PORT=3000
```

3. Install dependencies and run:

```bash
cd examples/custom-adapter
npm install
npm start
```

## Complete Example Implementation

### Project Structure

```
examples/
└── custom-adapter/
    ├── src/
    │   ├── main.ts
    │   ├── simple-adapter.ts
    │   ├── simple-transformer.ts
    │   ├── simple-storage.ts
    │   └── types.ts
    ├── .env
    └── package.json
```

### types.ts

```typescript
interface SimplePlatformWebhook {
	messageId: string;
	from: string;
	text: string;
	timestamp: number;
}

interface SimplePlatformMessage {
	to: string;
	content: string;
	replyTo?: string;
}
```

### simple-transformer.ts

```typescript
import { MessageTransformer, Message, IncomingGreenApiWebhook, formatPhoneNumber } from 'greenapi-integration';

export class SimpleTransformer extends MessageTransformer<SimplePlatformWebhook, SimplePlatformMessage> {
	toPlatformMessage(webhook: IncomingGreenApiWebhook): SimplePlatformMessage {
		if (webhook.messageData.typeMessage !== 'extendedTextMessage') {
			throw new Error('Only text messages are supported');
		}

		return {
			to: webhook.senderData.sender,
			content: webhook.messageData.extendedTextMessageData?.text || '',
		};
	}

	toGreenApiMessage(message: SimplePlatformWebhook): Message {
		return {
			type: 'text',
			chatId: formatPhoneNumber(message.from),
			message: message.text,
		};
	}
}
```

### simple-storage.ts

```typescript
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
		const user = {id: Date.now(), ...data};
		this.users.set(data.email, user);
		return user;
	}

	async findUser(identifier: string): Promise<BaseUser | null> {
		return this.users.get(identifier) || null;
	}

	async updateUser(identifier: string, data: any): Promise<BaseUser> {
		const user = await this.findUser(identifier);
		if (!user) throw new Error('User not found');
		const updated = {...user, ...data};
		this.users.set(identifier, updated);
		return updated;
	}
}
```

### simple-adapter.ts

```typescript
import { BaseAdapter, BaseInstance } from "greenapi-integration";
import axios from 'axios';

export class SimpleAdapter extends BaseAdapter<SimplePlatformWebhook, SimplePlatformMessage> {
	async createPlatformClient(config: { apiKey: string, apiUrl: string }) {
		return axios.create({
			baseURL: config.apiUrl,
			headers: {
				'Authorization': `Bearer ${config.apiKey}`,
				'Content-Type': 'application/json'
			}
		});
	}

	async sendToPlatform(message: SimplePlatformMessage, instance: BaseInstance): Promise<void> {
		// In a real implementation, we would send to the platform
		// For demo, we'll just log and simulate a response
		console.log('Platform received message:', message);

		// Simulate platform processing and responding
		setTimeout(() => {
			console.log('Platform processing complete, sending response...');
			this.simulatePlatformResponse(message, instance.idInstance);
		}, 1000);
	}

	private async simulatePlatformResponse(originalMessage: SimplePlatformMessage, idInstance: number | bigint) {
		const platformWebhook: SimplePlatformWebhook = {
			messageId: `resp_${Date.now()}`,
			from: originalMessage.to.replace('@c.us', ''),
			text: `Thanks for your message: "${originalMessage.content}". This is an automated response.`,
			timestamp: Date.now()
		};

		await this.handlePlatformWebhook(platformWebhook, idInstance);
	}
}
```

### main.ts

```typescript
import express from "express";
import bodyParser from "body-parser";
import { formatPhoneNumber, GreenApiClient } from "greenapi-integration";
import { SimpleTransformer } from "./simple-transformer";
import { SimpleStorage } from "./simple-storage";
import { SimpleAdapter } from "./simple-adapter";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
	// Initialize components
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

	// Create visitor's GREEN-API client (for sending initial message)
	const visitorClient = new GreenApiClient(visitorInstance);

	// Set up agent instance
	console.log("Setting up agent instance...");
	const user = await adapter.createUser("agent@example.com", {
		email: "agent@example.com",
		name: "Agent",
	});

	const instance = await adapter.createInstance(agentInstance, {
		webhookUrl: process.env.WEBHOOK_URL + "/webhook/green-api",
		webhookUrlToken: "your-secure-token",
		incomingWebhook: "yes",
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
	const port = process.env.PORT || 3000;
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
```

### .env

```env
VISITOR_ID_INSTANCE=your_visitor_instance_id
VISITOR_API_TOKEN=your_visitor_instance_token
AGENT_ID_INSTANCE=your_agent_instance_id
AGENT_API_TOKEN=your_agent_instance_token
AGENT_PHONE_NUMBER=your_agent_phone_number
WEBHOOK_URL=your_webhook_url
PORT=3000
```

## Real-World Examples

For complete real-world integration examples, check out:

- [Rocket.Chat Integration](link-to-rocket-chat-repo)

## Best Practices

1. **Message Transformation**:
    - Handle only relevant message types

2. **Security**:
    - Validate all incoming webhooks
    - Use secure tokens
    - Implement rate limiting
    - Use HTTPS for all endpoints

## Utilities

The platform provides several utility functions:

```typescript
// Format phone numbers for GREEN-API
formatPhoneNumber('1234567890') // Returns '1234567890@c.us'

// Generate secure random tokens
generateRandomToken(32) // Returns a 32-character random token
```

## License

MIT
