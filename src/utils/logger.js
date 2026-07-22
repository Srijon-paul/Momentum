import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

const { combine, timestamp, errors, json, printf, colorize } = winston.format;

const isProduction = process.env.NODE_ENV === "production";

// Development format
const devFormat = combine(
    colorize(),
    timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
    }),
    errors({ stack: true }),
    printf(({ timestamp, level, message, stack }) => {
        return `${timestamp} [${level}] ${stack || message}`;
    })
);

// Production format
const prodFormat = combine(timestamp(), errors({ stack: true }), json());

const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    level: process.env.LOG_LEVEL || "http",
    defaultMeta: {
        service: "momentum-opportunity-hub",
        environment: process.env.NODE_ENV || "development"
    },
    transports: [
        // Console Transport
        new winston.transports.Console({
            format: isProduction ? prodFormat : devFormat
        }),

        // Combined Log File with rotation
        new DailyRotateFile({
            dirname: path.join("logs"),
            filename: "application-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
            handleExceptions: true,
            handleRejections: true,
            format: prodFormat
        }),

        // Error Log File with rotation
        new DailyRotateFile({
            dirname: path.join("logs"),
            filename: "error-%DATE%.log",
            level: "error",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "30d",
            handleExceptions: true,
            handleRejections: true,
            format: prodFormat
        })
    ]
});

export default logger;
