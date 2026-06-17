import { Router } from "express";
import validate from "../../middlewares/validate.middleware.js";
import { registerSchema } from "./auth.validation.js";
import { login, refreshAccessTokenControl, register } from "./auth.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.route("/register").post(validate(registerSchema), register);
authRouter.route("/login").post(validate(registerSchema), login);
authRouter.route("/logout").post(verifyJWT, logout);
authRouter.route("/refresh-token").post(refreshAccessTokenControl);

export default authRouter;