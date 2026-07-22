import app from "./src/app.js";
import dotenv from "dotenv";
import logger from "./src/utils/logger.js";
import { connectDB } from "./src/DB/prismaDb.config.js";
import { gracefulShutdown } from "./src/utils/shutdown.js";
import { validateEnv } from "./src/utils/validateEnv.js";
import { createAdmin } from "./prisma/createAdmin.js";

dotenv.config({ path: "./.env" });
let server;
try {
    validateEnv();

    const port = process.env.PORT || 3400;

    await connectDB();
    await createAdmin();
    server = app.listen(port, () => {
        logger.info(`server is listening on port: ${port}`);
    });
} catch (error) {
    logger.error(error.message);
    process.exit(1);
}

process.on("uncaughtException", async (reason) => {
    logger.error("Uncaught Exception", {
        reason
    });
    await gracefulShutdown(server, "Uncaught Exception");
});

process.on("unhandledRejection", async (reason) => {
    logger.error("Unhandled Promise Rejection", {
        reason
    });
    await gracefulShutdown(server, "Unhandled Promise Rejection");
});

process.on("SIGINT", async () => {
    logger.info("SIGINT received");
    await gracefulShutdown(server, "SIGINT");
});

process.on("SIGTERM", async () => {
    logger.info("SIGTERM received");
    await gracefulShutdown(server, "SIGTERM");
});
