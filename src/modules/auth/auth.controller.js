import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { registerUser, loginUser } from "./auth.service.js";

const register = asyncHandler(async(req, res) => {
	const user = await registerUser(req.body);

	return res.status(201).json(
		new ApiResponse(201, user, "User is registered successfully")
	);
});

const login = asyncHandler(async(req, res) => {
	const result = await loginUser(req.body);

	const options = {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		path:"/"
	}

	return res.status(200)
	.cookie("accessToken", result.accessToken,
		{...options,
			maxAge: process.env.ACCESS_COOKIE_AGE
		}
	)
	.cookie("refreshToken", result.refreshToken,
		{...options,
			maxAge: process.env.REFRESH_COOKIE_AGE
		}
	)
	.json(
		new ApiResponse(200, result.user, "User Logged In Successfully")
	)
});
export {
	register,
	login
}