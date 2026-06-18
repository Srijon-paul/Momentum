import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/authorize.middleware.js";
import { getAllUsersControl, getUsersByIdControl } from "./admin.controller.js";

const adminRouter = Router();

adminRouter.route("/users").get(verifyJWT, authorize("ADMIN"), getAllUsersControl);
adminRouter.route("/users/:id").get(verifyJWT, authorize("ADMIN"), getUsersByIdControl);

export {
	adminRouter
}