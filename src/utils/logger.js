import winston from "winston";

const logger = winston.createLogger({
    level: "info", // severity level for logging including warning and error

    format: winston.format.combine(
        winston.format.timestamp(), // add current time of the logging event
        winston.format.errors({ stack: true }), // full error stack trace
        winston.format.json(), // overall json format rather than plain text
    ),

    transports: [
        new winston.transports.Console() // destination for logging the events
		// we can add files where logs can be saved
    ]
});

export default logger;