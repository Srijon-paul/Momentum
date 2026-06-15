import { Router } from "express";
import validate from "../../middlewares/validate.middleware.js";
import { registerSchema } from "./auth.validation.js";
import { registerUser } from "./auth.controller.js";

const authRouter = Router();

authRouter.route("/register").post(register, validate(registerSchema), registerUser);

export default authRouter;