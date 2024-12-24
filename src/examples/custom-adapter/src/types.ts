export interface SimplePlatformWebhook {
    messageId: string;
    from: string;
    text: string;
    timestamp: number;
}

export interface SimplePlatformMessage {
    to: string;
    content: string;
    replyTo?: string;
}
