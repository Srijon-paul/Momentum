import logger from "../utils/logger.js";

const errorHandler = (err, req, res) => {
    const statusCode = err.statusCode || 500;
    logger.error(err.message, {
        statusCode,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method
    });

    return res.status(statusCode).json({
        success: false,
        message:
            process.env.NODE_ENV === "production"
                ? statusCode === 500
                    ? "Internal server error"
                    : err.message
                : err.message,
        errors: process.env.NODE_ENV === "production" ? null : err.errors || null,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};

export { errorHandler };
