import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware.js";
import { speedLimiter } from "./middlewares/speedLimiter.middleware.js";
import { globalLimiter } from "./middlewares/rateLimit.middleware.js";
import stream from "./utils/morganStream.js";

import authRouter from "./modules/auth/auth.routes.js";
import userRouter from "./modules/users/user.routes.js";
import {
    opportunityRouter,
    adminOpportunityRouter
} from "./modules/opportunities/opportunity.routes.js";
import bookmarkRouter from "./modules/bookmarks/bookmark.routes.js";
import adminRouter from "./modules/admin/admin.routes.js";
import { serve, setup } from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";
import { ApiError } from "./utils/ApiError.js";
import { ApiResponse } from "./utils/ApiResponse.js";

const app = express();
const allowedOrigins = process.env.CORS_ORIGINS.split(",").map((orig) => orig.trim());

app.use(helmet());

app.use(
    cors({
        origin(origin, callback) {
            // !origin allowing request which are not from browser since they do not contain origin header and if contain they pass through the allowedOrigins to check then return a function which simply throws errors or allowed to continue the flow.
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            callback(new ApiError(403, "Origin not allowed in CORS"));
        },
        credentials: true, // for browsers to manage cookie headers with cors
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // only this methods will be allowed by cors
        allowedHeaders: ["Content-Type", "Authorization"], // only specific request headers are accepted rather than all
        maxAge: 86400 // pre-flight requests are cached for 24hours to reduce unnecessary traffic
    })
);

app.set("trust proxy", 1);

app.use(speedLimiter);
app.use(globalLimiter);

app.use(morgan(":method :url :status :response-time ms - :res[content-length]", { stream }));

app.use(hpp());

app.use(
    express.urlencoded({
        limit: "16kb",
        extended: true
    })
);
app.use(
    express.json({
        limit: "32kb"
    })
);
app.use(cookieparser());

const apiVersion = "/api/v1";

// health check endpoint
app.get(`${apiVersion}/health`, (req, res) => {
    res.status(200).json(new ApiResponse(200, {}, "Momentum API is healthy"));
});

app.use(`${apiVersion}/api-docs`, serve, setup(swaggerSpec));
app.use(`${apiVersion}/auth`, authRouter);
app.use(`${apiVersion}/admin`, adminRouter);
app.use(`${apiVersion}/users`, userRouter);
app.use(`${apiVersion}/admin/opportunities`, adminOpportunityRouter);
app.use(`${apiVersion}/opportunities`, opportunityRouter);
app.use(`${apiVersion}/bookmarks`, bookmarkRouter);

// 404 middleware
app.use((req, res, next) => {
    if (req.originalUrl === "/favicon.ico") {
        return res.sendStatus(204); // No Content
    }
    next(new ApiError(404, "Route not found"));
});

app.use(errorHandler);

export default app;
