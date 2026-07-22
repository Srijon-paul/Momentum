import { slowDown } from "express-slow-down";

export const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 50,
    delayMs: () => 500,
    maxDelayMs: 5000,
    validate: {
        delayMs: false
    }
});
