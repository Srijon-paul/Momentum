import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import logger from "../utils/logger.js";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export const connectDB = async () => {
    try {
        await prisma.$connect();
        logger.info("Connected to PostgreSQL.");
    } catch (error) {

        logger.error("Database connection failed.");
        process.exit(1);
    }
};

export { prisma };