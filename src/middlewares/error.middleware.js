import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	logger.error(err.message, {
		statusCode,
		stack: err.stack,
		path: req.originalUrl,
		method: req.method
	});

	return res.status(statusCode).json({
		success: false,
		message: err.message || "Internal Server Error",
		errors: err.errors || null,
		stack: process.env.NODE_ENV === "development" ? err.stack : undefined
	});
};

export { errorHandler };