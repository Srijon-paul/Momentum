import { prisma } from "../../DB/prismaDb.config"

const createOpportunity = async(data) => {
	const opportunity = await prisma.user.create({
		data: data
	});

	return opportunity;
};

export {
	createOpportunity
}