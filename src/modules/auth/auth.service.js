import { prisma } from "../../DB/prismaDb.config.js";
import { ApiError } from "../../utils/ApiError.js";

const register = async (data) => {
	const existingUser = await prisma.user.findUnique({
		where:{
			email: data.email
		}
	});
	if(existingUser){
		throw new ApiError(409, "User already exists");
	}
	const user = await prisma.user.create({
		data
	})

	return user;
}

export{
	register
}