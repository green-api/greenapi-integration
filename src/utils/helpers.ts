import * as crypto from "crypto";

export function formatPhoneNumber(phone: string): string {
	const cleaned = phone.replace(/\D/g, "");
	return `${cleaned}@c.us`;
}

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
