import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/authorize.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { createOpportunitySchema, getAllOpportunitiesSchema, opportunityIdSchema, updateOpportunitySchema } from "./opportunity.validation.js";
import { createOpportunityControl, deleteOpportunityControl, getAllOpportunityControl, getOpportunityByIdControl, updateOpportunityControl } from "./opportunity.controller.js";

const opportunityRouter = Router();
const adminOpportunityRouter = Router();

adminOpportunityRouter.route("/opportunities").post(verifyJWT, authorize("ADMIN"), validate(createOpportunitySchema), createOpportunityControl);

adminOpportunityRouter.route("/opportunities/:id").patch(verifyJWT, authorize("ADMIN"), validate(opportunityIdSchema), validate(updateOpportunitySchema), updateOpportunityControl);

adminOpportunityRouter.route("/opportunities/:id").delete(verifyJWT, authorize("ADMIN"), validate(opportunityIdSchema), deleteOpportunityControl);

opportunityRouter.route("/opportunities").get(verifyJWT, validate(getAllOpportunitiesSchema), getAllOpportunityControl);

opportunityRouter.route("/opportunities/:id").get(verifyJWT, validate(opportunityIdSchema), getOpportunityByIdControl);

export {
	opportunityRouter,
	adminOpportunityRouter
}