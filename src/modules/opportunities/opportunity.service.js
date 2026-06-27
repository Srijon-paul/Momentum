import { prisma } from "../../DB/prismaDb.config.js";
import { ApiError } from "../../utils/ApiError.js";

const createOpportunity = async (data, userId) => {
	const opportunity = await prisma.opportunity.create({
		data: {
			...data,
			createdBy: {
				connect: {
					id: userId
				}
			}
		}
	});

	return opportunity;
};

const getAllOpportunity = async (limit, skip, type, status, search) => {
	const where = {};
	if (type) where.type = type;
	if (status) where.status = status;

	const normalizedSearch = String(search ?? "").trim();
	if (normalizedSearch) {
		where.OR = [
			{
				title: {
					contains: normalizedSearch,
					mode: "insensitive"
				}
			},
			{
				organization: {
					contains: normalizedSearch,
					mode: "insensitive"
				}
			}
		];
	}
	const safeSkip = Math.max(0, Number(skip) || 0);
	const safeTake = Math.min(50, Math.max(1, Number(limit) || 5));
	const opportunities = await prisma.opportunity.findMany({
		skip: safeSkip,
		take: safeTake,
		where,
		orderBy: {
			created_at: "desc"
		}
	});
	const totalOpportunities = await prisma.opportunity.count({
		where
	});
	return { opportunities, totalOpportunities }
};

const getOpportunityById = async (opportunityId) => {
	const opportunity = await prisma.opportunity.findUnique({
		where: {
			id: opportunityId
		}
	});

	return opportunity;
}

const updateOpportunity = async (opportunityId, data) => {
	if(Object.keys(data).length === 0){
		throw new ApiError(400, "No data provided for update");
	}
	const existingOpportunity = await prisma.opportunity.findUnique({
		where: {
			id: opportunityId
		}
	});
	if (!existingOpportunity) throw new ApiError(404, "Opportunity not found");

	const updatedOpportunity = await prisma.opportunity.update({
		where: {
			id: opportunityId
		},
		data
	});
	return data;
}

const deleteOpportunity = async (opportunityId) => {
	const existingOpportunity = await prisma.opportunity.findUnique({
		where: {
			id: opportunityId
		}
	});
	if (!existingOpportunity) throw new ApiError(404, "Opportunity not found");

	const deletedOpportunity = await prisma.opportunity.delete({
		where: {
			id: opportunityId
		}
	});

	return deleteOpportunity;
}

export {
	createOpportunity,
	getAllOpportunity,
	getOpportunityById,
	updateOpportunity,
	deleteOpportunity
}