import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { bookmarkSchema } from "./bookmark.validation.js";
import { addBookmarkControl, getAllBookmarksControl, removeBookmarkControl } from "./bookmark.controller.js";

const bookmarkRoutes = Router();

bookmarkRoutes.route("/bookmarks/:opportunityId").post(verifyJWT, validate(bookmarkSchema), addBookmarkControl);

bookmarkRoutes.route("/bookmarks").get(verifyJWT, getAllBookmarksControl);

bookmarkRoutes.route("/bookmarks/:opportunityId").delete(verifyJWT, validate(bookmarkSchema), removeBookmarkControl);

export {
	bookmarkRoutes
}