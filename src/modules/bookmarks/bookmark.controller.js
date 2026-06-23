import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addBookmark, getAllBookmarks, removeBookmark } from "./bookmark.service.js";


const addBookmarkControl = asyncHandler(async(req, res) => {
	const bookmark = await addBookmark(req.user.id, req.params.opportunityId);

	return res.status(201).json(
		new ApiResponse(201, bookmark, "Bookmark added successfully")
	);
});

const getAllBookmarksControl = asyncHandler(async(req, res) => {
	const bookmarks = await getAllBookmarks(req.user.id);

	return res.status(200).json(
		new ApiResponse(200, bookmarks, "Bookmarks fetched successfully")
	)
});

const removeBookmarkControl = asyncHandler(async(req, res) => {
	const deletedBookmark = await removeBookmark(req.user.id, req.params.opportunityId);

	return res.status(200).json(
		new ApiResponse(200, deletedBookmark, "Bookmark removed successfully")
	);
});

export {
	addBookmarkControl,
	getAllBookmarksControl,
	removeBookmarkControl
}