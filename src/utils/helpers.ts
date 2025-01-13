import * as crypto from "crypto";
import { Settings } from "../types/types";

/**
 * Utility functions for working with phone numbers, tokens, and vCards.
 *
 * @category Utilities
 */

/**
 * Formats a phone number into GREEN-API's expected format.
 * Removes all non-digit characters and adds @c.us or @g.us suffix.
 *
 * @param phone - The phone number to format
 * @param chatType - The type of a chat, can be either "group" or "private"
 * @returns Formatted phone number with @c.us suffix
 *
 * @example
 * formatPhoneNumber('+1 (234) 567-8900')  // Returns '12345678900@c.us'
 * formatPhoneNumber('1234567890')          // Returns '1234567890@c.us'
 */
export function formatPhoneNumber(phone: string, chatType: "group" | "private" = "private"): string {
	const cleaned = phone.replace(/\D/g, "");
	return chatType === "private" ? `${cleaned}@c.us` : `${cleaned}@g.us`;
}

/**
 * Generates a cryptographically secure random token.
 *
 * @param length - Length of the token in bytes (default: 32)
 * @returns Hexadecimal string of the specified length
 *
 * @example
 * generateRandomToken()     // Returns a 64-character hex string (32 bytes)
 * generateRandomToken(16)   // Returns a 32-character hex string (16 bytes)
 */
export function generateRandomToken(length: number = 32): string {
	return crypto.randomBytes(length).toString("hex");
}

/**
 * Extracts a phone number from a vCard string format.
 * Supports various vCard formats and phone number notations.
 *
 * @param vcard - The vCard string containing contact information
 * @returns The extracted phone number or null if not found
 *
 * @example
 * const vcard = `BEGIN:VCARD\nTEL:+1234567890\nEND:VCARD`;
 * extractPhoneNumberFromVCard(vcard)  // Returns '+1234567890'
 */
export function extractPhoneNumberFromVCard(vcard: string): string | null {
	const phoneMatch = vcard.match(/TEL(?:;[^:]+)?:([+\d\s-]+)/);
	return phoneMatch ? phoneMatch[1] : null;
}

/**
 * Validates if a value is appropriate for a specific Settings interface key.
 * Checks type compatibility for numbers, strings, and yes/no enums.
 *
 * @param key - The settings key to validate
 * @param value - The value to check against the key's expected type
 * @returns Boolean indicating if the value is valid for the given key
 *
 * @example
 * isValidSettingValue('delaySendMessagesMilliseconds', 1000)     // Returns true
 * isValidSettingValue('outgoingWebhook', 'maybe')                // Returns false
 * isValidSettingValue('webhookUrl', 'https://example.com')       // Returns true
 */
export function isValidSettingValue(key: keyof Settings, value: any): boolean {
	switch (key) {
		case "delaySendMessagesMilliseconds":
			return typeof value === "number";
		case "wid":
		case "webhookUrl":
		case "webhookUrlToken":
			return typeof value === "string";
		case "markIncomingMessagesReaded":
		case "markIncomingMessagesReadedOnReply":
		case "outgoingWebhook":
		case "outgoingMessageWebhook":
		case "outgoingAPIMessageWebhook":
		case "stateWebhook":
		case "incomingWebhook":
		case "keepOnlineStatus":
		case "pollMessageWebhook":
		case "incomingCallWebhook":
			return value === "yes" || value === "no";
		default:
			return false;
	}
}

/**
 * Validates and cleans a settings object against the Settings interface.
 * Removes any properties that don't match the interface or have invalid values.
 *
 * @param settings - The settings object to validate and clean
 * @returns A new Settings object containing only valid properties and values
 *
 * @example
 * const input = {
 *   webhookUrl: 'https://example.com',
 *   outgoingWebhook: 'yes',
 *   invalidKey: 'value',
 *   delaySendMessagesMilliseconds: 'invalid'
 * };
 * validateAndCleanSettings(input)  // Returns { webhookUrl: 'https://example.com', outgoingWebhook: 'yes' }
 */
export function validateAndCleanSettings(settings: any): Settings {
	const validSettings: Settings = {};
	const settingsKeys = Object.keys(settings) as Array<keyof Settings>;

	for (const key of settingsKeys) {
		if (key in validSettings && isValidSettingValue(key, settings[key])) {
			validSettings[key] = settings[key];
		}
	}

	return validSettings;
}
