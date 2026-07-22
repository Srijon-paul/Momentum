import bcrypt from "bcrypt";
import { prisma } from "../src/DB/prismaDb.config.js";
import logger from "../src/utils/logger.js";

async function main() {
    logger.info("Seeding Database...");
    let admin = await prisma.user.findUnique({
        where: {
            email: process.env.ADMIN_EMAIL
        }
    });

    if (!admin) {
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        admin = await prisma.user.create({
            data: {
                name: process.env.ADMIN_NAME,
                email: process.env.ADMIN_EMAIL,
                password: hashedPassword,
                role: "ADMIN"
            }
        });
        logger.info(`Admin created: ${admin.id}`);
    } else {
        logger.info("Admin already exists");
    }

    await prisma.bookmark.deleteMany();
    await prisma.opportunity.deleteMany();

    await prisma.opportunity.createMany({
        data: [
            {
                title: "Backend Developer Intern",
                description:
                    "Work with the backend team to build scalable REST APIs using Node.js, Express and PostgreSQL.",
                type: "INTERNSHIP",
                deadline: new Date("2026-09-15T00:00:00.000Z"),
                organization: "Google",
                location: "Remote",
                apply_url: "https://careers.google.com/",
                created_by: admin.id
            },
            {
                title: "Google Summer Scholarship",
                description:
                    "Scholarship for undergraduate students pursuing Computer Science and related fields.",
                type: "SCHOLARSHIP",
                deadline: new Date("2026-10-01T00:00:00.000Z"),
                organization: "Google",
                location: "India",
                apply_url: "https://buildyourfuture.withgoogle.com/",
                created_by: admin.id
            },
            {
                title: "National Cyber Security Hackathon",
                description:
                    "Participate in a national-level cybersecurity hackathon focused on offensive and defensive security.",
                type: "HACKATHON",
                deadline: new Date("2026-08-20T00:00:00.000Z"),
                organization: "CERT-In",
                location: "New Delhi",
                apply_url: "https://www.cert-in.org.in/",
                created_by: admin.id
            },
            {
                title: "Open Source Coding Competition",
                description:
                    "Build impactful open-source software and compete with developers from across the country.",
                type: "COMPETITION",
                deadline: new Date("2026-11-10T00:00:00.000Z"),
                organization: "GitHub",
                location: "Remote",
                apply_url: "https://github.com/",
                created_by: admin.id
            },
            {
                title: "Modern Backend Development Workshop",
                description: "Hands-on workshop covering Express, Prisma, PostgreSQL and Docker.",
                type: "WORKSHOP",
                deadline: new Date("2026-08-05T00:00:00.000Z"),
                organization: "Opportunity Hub",
                location: "Kolkata",
                apply_url: "https://example.com/workshop",
                created_by: admin.id
            }
        ]
    });

    logger.info("Database seeded successfully.");
}

main()
    .catch(logger.error)
    .finally(() => prisma.$disconnect());
