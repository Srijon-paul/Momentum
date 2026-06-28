import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/authorize.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { createOpportunitySchema, getAllOpportunitiesSchema, opportunityIdSchema, updateOpportunitySchema } from "./opportunity.validation.js";
import { createOpportunityControl, deleteOpportunityControl, getAllOpportunityControl, getOpportunityByIdControl, updateOpportunityControl } from "./opportunity.controller.js";

const opportunityRouter = Router();
const adminOpportunityRouter = Router();

/**
 * @swagger
 * /opportunities/admin:
 *   post:
 *     summary: Create a new opportunity
 *     description: Create a new opportunity listing. Requires admin privileges. Deadline must be after start date and not in the past.
 *     tags:
 *       - Opportunities (Admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOpportunityRequest'
 *     responses:
 *       201:
 *         description: Opportunity created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 201
 *                 data:
 *                   $ref: '#/components/schemas/Opportunity'
 *                 message:
 *                   type: string
 *                   example: "Opportunity created successfully"
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
adminOpportunityRouter.route("/").post(verifyJWT, authorize("ADMIN"), validate(createOpportunitySchema), createOpportunityControl);

/**
 * @swagger
 * /opportunities/admin/{id}:
 *   patch:
 *     summary: Update an existing opportunity
 *     description: Update opportunity details. Requires admin privileges. All fields are optional.
 *     tags:
 *       - Opportunities (Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the opportunity
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOpportunityRequest'
 *     responses:
 *       200:
 *         description: Opportunity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Opportunity'
 *                 message:
 *                   type: string
 *                   example: "Opportunity updated successfully"
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
adminOpportunityRouter.route("/:id").patch(verifyJWT, authorize("ADMIN"), validate(opportunityIdSchema), validate(updateOpportunitySchema), updateOpportunityControl);

/**
 * @swagger
 * /opportunities/admin/{id}:
 *   delete:
 *     summary: Delete an opportunity
 *     description: Remove an opportunity listing from the system. Requires admin privileges.
 *     tags:
 *       - Opportunities (Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the opportunity
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Opportunity deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "Opportunity deleted successfully"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
adminOpportunityRouter.route("/:id").delete(verifyJWT, authorize("ADMIN"), validate(opportunityIdSchema), deleteOpportunityControl);

/**
 * @swagger
 * /opportunities:
 *   get:
 *     summary: Get all opportunities with pagination and filtering
 *     description: Retrieve opportunities with optional pagination, search, filtering by type and status. Requires authentication.
 *     tags:
 *       - Opportunities
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Page number for pagination (default 1)
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         description: Number of items per page (default 5, max 50)
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 5
 *       - in: query
 *         name: search
 *         description: Search opportunities by title or organization
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         description: Filter by opportunity type
 *         schema:
 *           type: string
 *           enum: [INTERNSHIP, SCHOLARSHIP, HACKATHON, COMPETITION, WORKSHOP]
 *       - in: query
 *         name: status
 *         description: Filter by opportunity status
 *         schema:
 *           type: string
 *           enum: [OPEN, CLOSED]
 *     responses:
 *       200:
 *         description: Successfully retrieved opportunities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     opportunities:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Opportunity'
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                 message:
 *                   type: string
 *                   example: "Opportunities fetched successfully"
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
opportunityRouter.route("/").get(verifyJWT, validate(getAllOpportunitiesSchema), getAllOpportunityControl);

/**
 * @swagger
 * /opportunities/{id}:
 *   get:
 *     summary: Get a specific opportunity by ID
 *     description: Retrieve detailed information about a specific opportunity. Requires authentication.
 *     tags:
 *       - Opportunities
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the opportunity
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Successfully retrieved opportunity details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Opportunity'
 *                 message:
 *                   type: string
 *                   example: "Opportunity fetched successfully"
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
opportunityRouter.route("/:id").get(verifyJWT, validate(opportunityIdSchema), getOpportunityByIdControl);

export {
	opportunityRouter,
	adminOpportunityRouter
}