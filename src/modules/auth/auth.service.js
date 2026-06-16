import { prisma } from "../../DB/prismaDb.config.js";
import { ApiError } from "../../utils/ApiError.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateTokens.js";

const registerUser = async (data) => {
	const existingUser = await prisma.user.findUnique({
		where:{
			email: data.email
		}
	});
	if(existingUser){
		throw new ApiError(409, "User already exists");
	}

	const hashedPassword = await bcrypt.hash(data.password, 10)
	const user = await prisma.user.create({
		data:{
			name: data.name,
			email: data.email,
			password: hashedPassword
		},
		omit:{
			password: true
		}
	})

	return user;
};

const loginUser = async(data) => {
	const {email, password} = data;
	const user = await prisma.user.findUnique({
		where:{
			email: data.email
		}
	});
	if(!user) throw new ApiError(401, "Invalid Credentials");

	const hashedPassword = user.password;
	
	const isPasswordValid = await bcrypt.compare(password, hashedPassword);
	if(!isPasswordValid) throw new ApiError(401, "Invalid Credentials!");

	const accessToken = await generateAccessToken(user.id);
	const refreshToken = await generateRefreshToken(user.id);

	const loggedinUser = await prisma.user.update({
		where:{
			id: user.id
		},
		data:{
			refresh_token: refreshToken
		},
		omit:{
			password: true,
			refresh_token: true
		}
	})

	return {
		user: loggedinUser,
		accessToken,
		refreshToken
	}
}

export{
	registerUser,
	loginUser
}