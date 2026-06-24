import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({
	origin: process.env.CORS_ORIGIN,
	credentials: true
}));
app.use(express.urlencoded({
	limit: "16kb",
	extended: true
}));
app.use(express.json({
	limit: "32kb",
}));
app.use(cookieparser());

import authRouter from "./modules/auth/auth.routes.js";
import userRouter from "./modules/users/user.routes.js";
import { opportunityRouter, adminOpportunityRouter } from "./modules/opportunities/opportunity.routes.js";
import bookmarkRouter from "./modules/bookmarks/bookmark.routes.js";
import adminRouter from "./modules/admin/admin.routes.js";

const apiVersion = "/api/v1";

app.use(`${apiVersion}/auth`, authRouter);
app.use(`${apiVersion}/admin`, adminRouter)
app.use(`${apiVersion}/users`, userRouter);
app.use(`${apiVersion}/admin/opportunities`, adminOpportunityRouter);
app.use(`${apiVersion}/opportunities`, opportunityRouter);
app.use(`${apiVersion}/bookmarks`, bookmarkRouter)

app.use(errorHandler);

export default app;