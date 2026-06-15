import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({path: "./.env"});

const port = process.env.port;
app.listen(port, () => {
	console.log("server is listening on port: ", port);
});