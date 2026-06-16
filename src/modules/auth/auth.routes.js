import { Router } from "express";
import validate from "../../middlewares/validate.middleware.js";
import { registerSchema } from "./auth.validation.js";
import { login, register } from "./auth.controller.js";

const authRouter = Router();

authRouter.route("/register").post(validate(registerSchema), register);
authRouter.route("/login").post(validate(registerSchema), login);

export default authRouter;