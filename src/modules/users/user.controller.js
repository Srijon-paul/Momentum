import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const getCurrentUserControl = asyncHandler(async(req, res) => {
	const user = req.user;
	
	return res.status(200).json(
		new ApiResponse(200, user, "Profile Fetched")
	)
});

export{
	getCurrentUserControl
}