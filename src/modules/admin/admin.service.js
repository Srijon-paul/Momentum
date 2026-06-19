import { prisma } from "../../DB/prismaDb.config.js"


const getAllUsers = async (limit, skip, search) => {
	const where = {
		OR: [
			{
				name: {
					contains: search,
					mode: "insensitive"
				}
			},
			{
				email: {
					contains: search,
					mode: "insensitive"
				}
			}
		]
	}
	const users = await prisma.user.findMany({
		skip,
		take: limit,
		where: where,
		orderBy: {
			created_at: "desc"
		},
		omit: {
			password: true,
			refresh_token: true
		}
	});

	const totalUsers = await prisma.user.count({
		where
	});
	const totalPages = Math.ceil(totalUsers / limit);

	return {users, totalUsers};
};

const getUserById = async (userId) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId
		},
		omit: {
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