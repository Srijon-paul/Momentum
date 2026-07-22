import { prisma } from "../../DB/prismaDb.config.js";
import { ApiError } from "../../utils/ApiError.js";

const addBookmark = async (userId, opportunityId) => {
    const opportunity = await prisma.opportunity.findUnique({
        where: {
            id: opportunityId
        }
    });
    if (!opportunity) throw new ApiError(404, "Opportunity not found");

    const existingBookmark = await prisma.bookmark.findUnique({
        where: {
            user_id_opportunity_id: {
                user_id: userId,
                opportunity_id: opportunityId
            }
        }
    });

    if (existingBookmark) {
        throw new ApiError(409, "Opportunity already bookmarked");
    }

    const bookmark = await prisma.bookmark.create({
        data: {
            user_id: userId,
            opportunity_id: opportunityId
        }
    });

    return bookmark;
};

const getAllBookmarks = async (userId) => {
    const bookmarks = await prisma.bookmark.findMany({
        where: {
            user_id: userId
        },
        include: {
            opportunity: true
        }
    });

    return bookmarks;
};

const removeBookmark = async (userId, opportunityId) => {
    const bookmark = await prisma.bookmark.findUnique({
        where: {
            user_id_opportunity_id: {
                user_id: userId,
                opportunity_id: opportunityId
            }
        }
    });
    if (!bookmark) throw new ApiError(404, "Bookmark not found");

    const deletedBookmark = await prisma.bookmark.delete({
        where: {
            id: bookmark.id
        }
    });

    return deletedBookmark;
};

export { addBookmark, getAllBookmarks, removeBookmark };
