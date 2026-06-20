import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/authorize.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { createOpportunitySchema } from "./opportunity.validation.js";
import { createOpportunityControl } from "./opportunity.controller.js";

const opportunityRouter = Router();
const adminOpportunityRouter = Router();

adminOpportunityRouter.route("/opportunities").post(verifyJWT, authorize("ADMIN"), validate(createOpportunitySchema), createOpportunityControl);

export {
	opportunityRouter,
	adminOpportunityRouter
}