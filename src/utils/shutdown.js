import { prisma } from "../DB/prismaDb.config.js";
import logger from "./logger.js";

const gracefulShutdown = async (server, reason = "Unknown") => {
    logger.warn(`Graceful shutdown initiated: ${reason}`);

    try {
        if (server) {
            await new Promise((resolve) => server.close(resolve));
            logger.info("HTTP server closed");
        }
        await prisma.$disconnect();
        logger.info("Database Disconnected");
        process.exit(0);
    } catch (error) {
        logger.error("Error during graceful shutdown", {
            message: error.message,
            stack: error.stack
        });
        process.exit(1);
    }
};

export { gracefulShutdown };
