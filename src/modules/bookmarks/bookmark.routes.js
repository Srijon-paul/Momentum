import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { bookmarkSchema } from "./bookmark.validation.js";
import { addBookmarkControl, getAllBookmarksControl, removeBookmarkControl } from "./bookmark.controller.js";

const bookmarkRouter = Router();

bookmarkRouter.route("/:opportunityId").post(verifyJWT, validate(bookmarkSchema), addBookmarkControl);

bookmarkRouter.route("/").get(verifyJWT, getAllBookmarksControl);

bookmarkRouter.route("/:opportunityId").delete(verifyJWT, validate(bookmarkSchema), removeBookmarkControl);

export default bookmarkRouter;