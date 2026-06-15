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

app.use(errorHandler);

export default app;