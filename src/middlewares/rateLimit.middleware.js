import { rateLimit } from "express-rate-limit";
import { ApiError } from "../utils/ApiError.js";
import logger from "../utils/logger.js";

const createLimiter = (windowMs, limit, message) => {
	return rateLimit({
		windowMs,
		limit,
		standardHeaders: true,
		legacyHeaders: false,
		handler: (req, res, next) => {
			logger.warn(`${message} for ${req.user.id}`);
			next(new ApiError(429, message));
		}
	});
}

export const globalLimiter = createLimiter(
	15 * 60 * 1000,
	300,
	"Too many requests. Please Try again Later!"
);

export const authLimiter = createLimiter(
	15 * 60 * 1000,
	10,
	"Too many attempts. Please try again later."
);

export const readLimiter = createLimiter(
	60 * 1000,
	100,
	"Too many requests. Please slow down."
);

export const writeLimiter = createLimiter(
	60 * 1000,
	40,
	"Too many Operation requests. Please Try again later"
);

export const adminLimiter = createLimiter(
	60 * 1000,
	30,
	"Too many requests. Please slow down."
)