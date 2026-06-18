import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getAllUsers, getUserById } from "./admin.service.js";


const getAllUsersControl = asyncHandler(async(req, res) => {
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 5;
	const skip = (page - 1) * limit;
	const users = getAllUsers(limit, skip);

	return res.status(200).json(
		new ApiResponse(200, users, "Users Fetched Successfully")
	);
});

const getUsersByIdControl = asyncHandler(async(req, res) => {
	const user = await getUserById(req.params.id);

	return res.status(200).json(
		new ApiResponse(200, users, "User Fetched Successfully")
	);
})

export{
	getAllUsersControl,
	getUsersByIdControl
}