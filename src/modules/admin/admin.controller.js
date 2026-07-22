import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getAllUsers, getUserById } from "./admin.service.js";

const getAllUsersControl = asyncHandler(async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 5));
    const skip = (page - 1) * limit;
    const search = req.query.search?.trim() || "";
    const { users, totalUsers } = await getAllUsers(limit, skip, search);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                users,
                page,
                limit,
                totalUsers,
                totalPages: Math.ceil(totalUsers / limit)
            },
            "Users Fetched Successfully"
        )
    );
});

const getUsersByIdControl = asyncHandler(async (req, res) => {
    const user = await getUserById(req.params.id);

    if (!user) throw new ApiError(404, "User Not found");

    return res.status(200).json(new ApiResponse(200, user, "User Fetched Successfully"));
});

export { getAllUsersControl, getUsersByIdControl };
