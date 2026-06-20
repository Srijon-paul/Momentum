import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createOpportunity } from "./opportunity.service.js";


const createOpportunityControl = asyncHandler(async(req, res) => {
	const opportunity = await createOpportunity(req.body);

	return res.status(201).json(
		new ApiResponse(201, opportunity, "Opportunity created successfully")
	)
});

export {
	createOpportunityControl
}