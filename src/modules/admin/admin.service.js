import { prisma } from "../../DB/prismaDb.config.js"


const getAllUsers = async(limit, skip) => {
	const users = await prisma.user.findMany({
		skip,
		take: limit,
		omit:{
			password: true,
			refresh_token: true
		}
	});

	return users;
};

const getUserById = async(userId) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId
		},
		omit:{
			password: true,
			refresh_token: true
		}
	});

	return user;
}

export {
	getAllUsers,
	getUserById
}