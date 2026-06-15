import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { register } from "./auth.service.js";

const registerUser = asyncHandler(async(req, res) => {
	const user = await register(req.body);

	return res.status(201).json(
		new ApiResponse(201, user, "User is registered successfully")
	);
});

export {
	registerUser
}