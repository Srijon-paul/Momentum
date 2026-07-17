import bcrypt from "bcrypt";
import { prisma } from "../src/DB/prismaDb.config.js";
import logger from "../src/utils/logger.js";

const createAdmin = async() => {
	logger.info("Trying to create Admin...")
	let admin = await prisma.user.findUnique({
		where: {
			email: process.env.ADMIN_EMAIL,
		},
	});

	if (!admin) {
		const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
		admin = await prisma.user.create({
			data: {
				name: process.env.ADMIN_NAME,
				email: process.env.ADMIN_EMAIL,
				password: hashedPassword,
				role: "ADMIN",
			},
		});
		logger.info(`Admin created: ${admin.id}`);
	} else {
		logger.info("Admin already exists");
	}
}

export{
	createAdmin
}