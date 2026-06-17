import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware";
import { getCurrentUserControl } from "./user.controller";

const userRoutes = Router();

userRoutes.route("/profile").get(verifyJWT, getCurrentUserControl);

export default userRoutes;