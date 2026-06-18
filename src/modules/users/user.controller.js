import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { updateProfile } from "./user.service.js";

const getCurrentUserControl = asyncHandler(async(req, res) => {
	const user = req.user;
	
	return res.status(200).json(
		new ApiResponse(200, user, "Profile Fetched")
	)
});

const updateUserProfile = asyncHandler(async(req, res) => {
	const updatedUser = await updateProfile(req.user.id, req.body);

	return res.status(200).json(
		new ApiResponse(200, updatedUser, "User Profile updated successfully")
	)
});

export{
	getCurrentUserControl,
	updateUserProfile
}