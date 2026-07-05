import app from "./src/app.js";
import dotenv from "dotenv";
import logger from "./src/utils/logger.js";

dotenv.config({path: "./.env"});

const port = process.env.PORT || 3400;
app.listen(port, () => {
	logger.info(`server is listening on port: ${port}`);
});