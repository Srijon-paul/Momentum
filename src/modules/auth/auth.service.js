import { prisma } from "../../DB/prismaDb.config.js";
import { ApiError } from "../../utils/ApiError.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateTokens.js";
import jwt from "jsonwebtoken";
import logger from "../../utils/logger.js";

const registerUser = async (data) => {
	const existingUser = await prisma.user.findUnique({
		where: {
			email: data.email
		}
	});
	if (existingUser) {
		throw new ApiError(409, "User already exists");
	}

	const hashedPassword = await bcrypt.hash(data.password, 10)
	const user = await prisma.user.create({
		data: {
			name: data.name,
			email: data.email,
			password: hashedPassword
		},
		omit: {
			password: true,
			refresh_token: true
		}
	})
	logger.info(`New User Registered ${user.email}`);
	return user;
};

const loginUser = async (data) => {
	const { email, password } = data;
	const user = await prisma.user.findUnique({
		where: {
			email: data.email
		}
	});
	if (!user){
		logger.warn(`Failed login attempt for ${email}`);
		throw new ApiError(401, "Invalid Credentials");
	}	
	const hashedPassword = user.password;
	const isPasswordValid = await bcrypt.compare(password, hashedPassword);
	if (!isPasswordValid){
		logger.warn(`Failed login attempt for ${user.email}`);
		throw new ApiError(401, "Invalid Credentials!");
	}
	const accessToken = await generateAccessToken(user.id);
	const refreshToken = await generateRefreshToken(user.id);

	const loggedinUser = await prisma.user.update({
		where: {
			id: user.id
		},
		data: {
			refresh_token: refreshToken
		},
		omit: {
			password: true,
			refresh_token: true
		}
	})

	logger.info(`User ${user.email} logged in`);

	return {
		user: loggedinUser,
		accessToken,
		refreshToken
	}
};

const logoutUser = async (userId) => {
	await prisma.user.update({
		where: {
			id: userId
		},
		data: {
			refresh_token: null
		}
	});
	logger.info(`User ${userId} logged out successfully`);
};

const refreshAccessToken = async (data) => {
	const incomingRefreshToken = data;
	if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized Request");

	try {
		const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
		const user = await prisma.user.findUnique({
			where: {
				id: decodedToken.id
			}
		});
		if (!user){ 
			logger.warn(`Unauthorize access with refresh token for userId ${decodedToken.id}`);
			throw new ApiError(401, "Unauthorized Access");
		}
		if (incomingRefreshToken !== user.refresh_token){
			logger.warn(`Invalid refresh token for userId ${user.id}`);
			throw new ApiError(401, "Invalid Refresh Token");
		}

		const accessToken = await generateAccessToken(user.id);
		const refreshToken = await generateRefreshToken(user.id);

		await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				refresh_token: refreshToken
			},
			omit: {
				password: true,
				refresh_token: true
			}
		})

		return {
			accessToken,
			refreshToken
		}
	} catch (error) {
		logger.error(error);
		throw new ApiError(401, "Unauthorized Access");
	}
}

export {
	registerUser,
	loginUser,
	logoutUser,
	refreshAccessToken
}