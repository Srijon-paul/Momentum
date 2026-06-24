import bcrypt from "bcrypt";
import { prisma } from "./src/DB/prismaDb.config.js";

async function main() {
    const adminExists = await prisma.user.findUnique({
        where: {
            email: process.env.ADMIN_EMAIL
        }
    });

    if (adminExists) {
        console.log("Admin already exists");
        return;
    }

    const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        10
    );

    await prisma.user.create({
        data: {
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "ADMIN"
        }
    });

    console.log("Admin created");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());