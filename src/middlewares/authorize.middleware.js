import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import logger from "../utils/logger.js";

const authorize = (...roles) => {
	return asyncHandler(async(req, res, next) => {
		if(!req.user) throw new ApiError(401, "Unauthorized");

		if(!roles.includes(req.user.role)) {
			logger.warn(`User ${req.user.id} tried accessing forbidden routes`);
			throw new ApiError(403, "Forbidden Access");
		}
		next();
	})
};

export{
	authorize
}