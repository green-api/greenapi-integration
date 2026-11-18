export const PHONE_PERMANENT_CLOSE_CODES = {min: 4000, max: 4999} as const;
export const PHONE_RECONNECT_DELAYS_MS = {first: 500, max: 10000} as const;
export const PHONE_CLOSE_NORMAL = 1000;
export const PHONE_NOT_CONNECTED = {code: "CALL_FAILED", message: "The phone is not connected"} as const;
export const PHONE_CLOSED = {code: "CALL_ENDED", message: "The phone connection was closed"} as const;
export const PHONE_NOTHING_TO_JOIN = {code: "NO_ACTIVE_CALL", message: "There is no call to join"} as const;
export const PHONE_ACCEPT_FIRST = {code: "NO_ACTIVE_CALL", message: "Accept the incoming call first"} as const;
export const PHONE_JOINABLE_STATES = ["out-call", "on-call"] as const;
