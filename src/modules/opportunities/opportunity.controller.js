import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
    createOpportunity,
    deleteOpportunity,
    getAllOpportunity,
    getOpportunityById,
    updateOpportunity
} from "./opportunity.service.js";

const createOpportunityControl = asyncHandler(async (req, res) => {
    const payload = req.validatedData || req.body;
    const opportunity = await createOpportunity(payload, req.user.id);

    return res
        .status(201)
        .json(new ApiResponse(201, opportunity, "Opportunity created successfully"));
});

const getAllOpportunityControl = asyncHandler(async (req, res) => {
    const { page = 1, limit = 5, search = "", type = "", status = "" } = req.validatedData || {};

    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(50, Math.max(1, Number(limit) || 5));
    const skip = (safePage - 1) * safeLimit;

    const { opportunities, totalOpportunities } = await getAllOpportunity(
        safeLimit,
        skip,
        type,
        status,
        search
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                opportunities,
                page,
                limit,
                totalOpportunities,
                totalPages: Math.ceil(totalOpportunities / limit)
            },
            "Opportunities Fetched successfully"
        )
    );
});

const getOpportunityByIdControl = asyncHandler(async (req, res) => {
    const opportunity = await getOpportunityById(req.params.id);

    if (!opportunity) throw new ApiError(404, "Opportunity not found");

    return res
        .status(200)
        .json(new ApiResponse(200, opportunity, "Opportunity Fetched Successfully"));
});

const updateOpportunityControl = asyncHandler(async (req, res) => {
    const payload = req.validatedData || req.body;
    const opportunity = await updateOpportunity(req.params.id, payload);

    if (!opportunity) throw new ApiError(404, "Opportunity not found");

    return res
        .status(200)
        .json(new ApiResponse(200, opportunity, "Opportunity Updated Successfully"));
});

const deleteOpportunityControl = asyncHandler(async (req, res) => {
    const opportunity = await deleteOpportunity(req.params.id);

    return res
        .status(200)
        .json(new ApiResponse(200, opportunity, "Opportunity deleted Successfully"));
});

export {
    createOpportunityControl,
    getAllOpportunityControl,
    getOpportunityByIdControl,
    updateOpportunityControl,
    deleteOpportunityControl
};
