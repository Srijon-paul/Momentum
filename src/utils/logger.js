import winston from "winston";
import path from "path";

const { combine, timestamp, errors, json, printf, colorize } = winston.format;

const isProduction = process.env.NODE_ENV === "production";

// Development format
const devFormat = combine(
    colorize(),
    timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }),
    errors({ stack: true }),
    printf(({ timestamp, level, message, stack }) => {
        return `${timestamp} [${level}] ${stack || message}`
    })
);

// Production format
const prodFormat = combine(
    timestamp(),
    errors({ stack: true }),
    json()
);

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    defaultMeta: {
        service: "momentum-opportunity-hub",
        environment: process.env.NODE_ENV || "development",
    },
    transports: [
        // Console Transport
        new winston.transports.Console({
            format: isProduction ? prodFormat : devFormat,
        }),

        // Combined Log File
        new winston.transports.File({
            filename: path.join("logs", "combined.log"),
            format: prodFormat,
        }),

        // Error Log File
        new winston.transports.File({
            filename: path.join("logs", "error.log"),
            level: "error",
            format: prodFormat,
        }),
    ],
});

export default logger;