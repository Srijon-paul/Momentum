import { ApiError } from "../utils/ApiError"
import { asyncHandler } from "../utils/asyncHandler";

const authorize = (...roles) => {
	return asyncHandler(async(req, res, next) => {
		if(!req.user) throw new ApiError(401, "Unauthorized");

		if(!roles.includes(req.user.role)) throw new ApiError(403, "Forbidden Access");

		next();
	})
};

export{
	authorize
}