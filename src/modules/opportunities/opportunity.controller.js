import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createOpportunity, deleteOpportunity, getAllOpportunity, getOpportunityById, updateOpportunity } from "./opportunity.service.js";


const createOpportunityControl = asyncHandler(async(req, res) => {
	const opportunity = await createOpportunity(req.body);

	return res.status(201).json(
		new ApiResponse(201, opportunity, "Opportunity created successfully")
	)
});

const getAllOpportunityControl = asyncHandler(async(req, res) => {
	const page = Number(req.query.page);
	const limit = Number(req.query.limit);
	const skip = (page - 1) * limit;
	const search = req.query.search || "";
	const type = req.query.type || "";
	const status = req.query.status || "";

	const {opportunities, totalOpportunities} = await getAllOpportunity(limit, skip, type, status, search);

	return res.status(200).json(
		new ApiResponse(200, {
			opportunities, page, limit, totalOpportunities,
			totalPages: Math.ceil(totalOpportunities / limit)
		}, "Opportunities Fetched successfully")
	);
});

const getOpportunityByIdControl = asyncHandler(async(req, res) => {
	const opportunity = await getOpportunityById(req.params.id);

	if(!opportunity) throw new ApiError(404, "Opportunity not found");

	return res.status(200).json(
		new ApiResponse(200, opportunity, "Opportunity Fetched Successfully")
	);
});

const updateOpportunityControl = asyncHandler(async(req, res) => {
	const opportunity = await updateOpportunity(req.params.id, req.body);

	if(!opportunity) throw new ApiError(404, "Opportunity not found");

	return res.status(200).json(
		new ApiResponse(200, opportunity, "Opportunity Updated Successfully")
	);
});

const deleteOpportunityControl = asyncHandler(async(req, res) => {
	const opportunity = await deleteOpportunity(req.params.id);

	return res.status(200).json(
		new ApiResponse(200, opportunity, "Opportunity deleted Successfully")
	);
});

export {
	createOpportunityControl,
	getAllOpportunityControl,
	getOpportunityByIdControl,
	updateOpportunityControl,
	deleteOpportunityControl
}