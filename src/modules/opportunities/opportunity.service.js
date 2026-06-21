import { prisma } from "../../DB/prismaDb.config"
import { ApiError } from "../../utils/ApiError";

const createOpportunity = async(data) => {
	const opportunity = await prisma.opportunity.create({
		data: data
	});

	return opportunity;
};

const getAllOpportunity = async(limit, skip, type, status, search) => {
	const where = {};
	if(type) where.type = type;
	if(status) where.status = status;

	if(search) {
		where.OR = [
			{
				title: {
					contains: search,
					mode: "insensitive"
				}
			},
			{
				organization: {
					contains: search,
					mode: "insensitive"
				}
			}
		]
	};
	const opportunity = await prisma.opportunity.findMany({
		skip,
		take: limit,
		where,
		orderBy: {
			created_at: "desc"
		}
	});
	const totalOpportunities = await prisma.opportunity.count({
		where
	});
	return { opportunity, totalOpportunities}
};

const getOpportunityById = async(opportunityId) => {
	const opportunity = await prisma.opportunity.findUnique({
		where: {
			id: opportunityId
		}
	});

	return opportunity;
}

export {
	createOpportunity,
	getAllOpportunity,
	getOpportunityById
}