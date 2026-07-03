import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { getCurrentUserControl, updateUserProfile } from "./user.controller.js";
import { updateUserProfileSchema } from "./user.validation.js";
import validate from "../../middlewares/validate.middleware.js";
import { readLimiter, writeLimiter } from "../../middlewares/rateLimit.middleware.js";

const userRouter = Router();

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get current user profile
 *     description: Retrieve the profile information of the authenticated user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: "User profile fetched successfully"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
userRouter.route("/profile").get(verifyJWT, readLimiter, getCurrentUserControl);

/**
 * @swagger
 * /users/profile:
 *   patch:
 *     summary: Update user profile
 *     description: Update the profile information of the authenticated user. All fields are optional.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserProfileRequest'
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: "User profile updated successfully"
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
userRouter.route("/profile").patch(verifyJWT, writeLimiter, validate(updateUserProfileSchema), updateUserProfile);

export default userRouter;