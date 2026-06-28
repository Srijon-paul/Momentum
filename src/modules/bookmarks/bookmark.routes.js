import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { bookmarkSchema } from "./bookmark.validation.js";
import { addBookmarkControl, getAllBookmarksControl, removeBookmarkControl } from "./bookmark.controller.js";

const bookmarkRouter = Router();

/**
 * @swagger
 * /bookmarks/{opportunityId}:
 *   post:
 *     summary: Add an opportunity to bookmarks
 *     description: Save an opportunity to the current user's bookmarks. Requires authentication.
 *     tags:
 *       - Bookmarks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: opportunityId
 *         required: true
 *         description: The unique identifier of the opportunity to bookmark
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       201:
 *         description: Bookmark added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 201
 *                 data:
 *                   $ref: '#/components/schemas/Bookmark'
 *                 message:
 *                   type: string
 *                   example: "Bookmark added successfully"
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       409:
 *         description: Conflict - Bookmark already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
bookmarkRouter.route("/:opportunityId").post(verifyJWT, validate(bookmarkSchema), addBookmarkControl);

/**
 * @swagger
 * /bookmarks:
 *   get:
 *     summary: Get all user bookmarks
 *     description: Retrieve all opportunities bookmarked by the current user. Requires authentication.
 *     tags:
 *       - Bookmarks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user bookmarks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Bookmark'
 *                 message:
 *                   type: string
 *                   example: "Bookmarks fetched successfully"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
bookmarkRouter.route("/").get(verifyJWT, getAllBookmarksControl);

/**
 * @swagger
 * /bookmarks/{opportunityId}:
 *   delete:
 *     summary: Remove an opportunity from bookmarks
 *     description: Delete an opportunity from the current user's bookmarks. Requires authentication.
 *     tags:
 *       - Bookmarks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: opportunityId
 *         required: true
 *         description: The unique identifier of the opportunity to remove from bookmarks
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Bookmark removed successfully
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
 *                   example: "Bookmark removed successfully"
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
bookmarkRouter.route("/:opportunityId").delete(verifyJWT, validate(bookmarkSchema), removeBookmarkControl);

export default bookmarkRouter;