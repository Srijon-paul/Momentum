import { prisma } from "../../DB/prismaDb.config.js";
import { ApiError } from "../../utils/ApiError.js";

const updateProfile = async (userId, data) => {
    if (Object.keys(data).length === 0) {
        throw new ApiError(400, "No data provided for update");
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data,
        omit: {
            password: true,
            refresh_token: true
        }
    });

    return updatedUser;
};

export { updateProfile };
