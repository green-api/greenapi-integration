import * as crypto from "crypto";

export function formatPhoneNumber(phone: string): string {
	const cleaned = phone.replace(/\D/g, "");
	return `${cleaned}@c.us`;
}

export function generateRandomToken(length: number = 32): string {
	return crypto.randomBytes(length).toString("hex");
}
