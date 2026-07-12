import app from "./src/app.js";
import dotenv from "dotenv";
import logger from "./src/utils/logger.js";
import { connectDB } from "./src/DB/prismaDb.config.js";
import { gracefulShutdown } from "./src/utils/shutdown.js";

dotenv.config({path: "./.env"});
import "./src/utils/validateEnv.js";

const port = process.env.PORT || 3400;

await connectDB();
const server = app.listen(port, () => {
	logger.info(`server is listening on port: ${port}`);
});

process.on("uncaughtException", async(reason) => {
	logger.error("Uncaught Exception", {
		reason
	})
	await gracefulShutdown(server, "Uncaught Exception")
});

process.on("unhandledRejection", async (reason) => {
    logger.error("Unhandled Promise Rejection", {
        reason,
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