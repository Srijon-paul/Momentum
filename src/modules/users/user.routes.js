import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { getCurrentUserControl, updateUserProfile } from "./user.controller.js";
import { updateUserProfileSchema } from "./user.validation.js";
import validate from "../../middlewares/validate.middleware.js";

const userRoutes = Router();

userRoutes.route("/profile").get(verifyJWT, getCurrentUserControl);
userRoutes.route("/profile").patch(verifyJWT, validate(updateUserProfileSchema), updateUserProfile);

export default userRoutes;