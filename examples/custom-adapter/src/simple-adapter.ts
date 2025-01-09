import { BaseAdapter, BaseInstance } from "@green-api/greenapi-integration";
import { SimplePlatformMessage, SimplePlatformWebhook } from "./types";
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
