import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../DB/prismaDb.config.js";

const verifyJWT = asyncHandler(async(req, res, next) => {
	try {
		const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
		if(!token){
			throw new ApiError(401, "Unauthorized Request!");
		}
	
		const decoded = jwt.verify(
			token,
			process.env.ACCESS_TOKEN_SECRET
		);
	
		const user = await prisma.user.findUnique({
			where: {
				id: decoded.id
			},
			omit: {
				password: true,
				refresh_token: true
			}
		});
		if(!user) throw new ApiError(401, "Invalid Access Token");
	
		req.user = user;
		next();
	} catch (error) {
		throw new ApiError(401, "Invalid Access Token!");
	}
})

export {
	verifyJWT
}