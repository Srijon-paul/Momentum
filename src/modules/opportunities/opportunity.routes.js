import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/authorize.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { createOpportunitySchema, getAllOpportunitiesSchema, opportunityIdSchema, updateOpportunitySchema } from "./opportunity.validation.js";
import { createOpportunityControl, deleteOpportunityControl, getAllOpportunityControl, getOpportunityByIdControl, updateOpportunityControl } from "./opportunity.controller.js";

const opportunityRouter = Router();
const adminOpportunityRouter = Router();

adminOpportunityRouter.route("/").post(verifyJWT, authorize("ADMIN"), validate(createOpportunitySchema), createOpportunityControl);

adminOpportunityRouter.route("/:id").patch(verifyJWT, authorize("ADMIN"), validate(opportunityIdSchema), validate(updateOpportunitySchema), updateOpportunityControl);

adminOpportunityRouter.route("/:id").delete(verifyJWT, authorize("ADMIN"), validate(opportunityIdSchema), deleteOpportunityControl);

opportunityRouter.route("/").get(verifyJWT, validate(getAllOpportunitiesSchema), getAllOpportunityControl);

opportunityRouter.route("/:id").get(verifyJWT, validate(opportunityIdSchema), getOpportunityByIdControl);

export {
	opportunityRouter,
	adminOpportunityRouter
}