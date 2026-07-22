import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../DB/prismaDb.config.js";
import logger from "../utils/logger.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            logger.warn("JWT verification failed");
            throw new ApiError(401, "Unauthorized Request!");
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            },
            omit: {
                password: true,
                refresh_token: true
            }
        });
        if (!user) {
            logger.warn(`Invalid Token for User ${decoded.id}`);
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        logger.error(`Fail to verify JWT due to some error: ${error}`);
        throw new ApiError(401, "Invalid Access Token!");
    }
});

export { verifyJWT };
