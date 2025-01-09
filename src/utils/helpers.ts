import * as crypto from "crypto";

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
