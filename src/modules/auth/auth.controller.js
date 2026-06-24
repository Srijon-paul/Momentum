import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { registerUser, loginUser, refreshAccessToken, logoutUser } from "./auth.service.js";

// cookie options
const options = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "strict",
	path: "/"
}

const register = asyncHandler(async (req, res) => {
	const user = await registerUser(req.body);

	return res.status(201).json(
		new ApiResponse(201, user, "User is registered successfully")
	);
});

const login = asyncHandler(async (req, res) => {
	const result = await loginUser(req.body);

	return res.status(200)
		.cookie("accessToken", result.accessToken,
			{
				...options,
				maxAge: Number(process.env.ACCESS_COOKIE_AGE)
			}
		)
		.cookie("refreshToken", result.refreshToken,
			{
				...options,
				maxAge: Number(process.env.REFRESH_COOKIE_AGE)
			}
		)
		.json(
			new ApiResponse(200, result.user, "User Logged In Successfully")
		)
});

const logout = asyncHandler(async (req, res) => {
	await logoutUser(req.user.id);

	return res.status(200)
		.clearCookie("accessToken", options)
		.clearCookie("refreshToken", options)
		.json(new ApiResponse(200, null, "Logged Out successfully"));
});

const refreshAccessTokenControl = asyncHandler(async(req, res) => {
	const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
	const result = await refreshAccessToken(incomingRefreshToken);

	return res.status(200)
	.cookie("accessToken", result.accessToken, options)
	.cookie("refreshToken", result.refreshToken, options)
	.json(new ApiResponse(200, {}, "Tokens Refreshed"))
})

export {
	register,
	login,
	logout,
	refreshAccessTokenControl
}