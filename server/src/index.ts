import express, { Express } from "express";
import mongoose from "mongoose";
import router from "./routes/get";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:5173",
	})
);

mongoose
	.connect(process.env.MONGO_URL as string)
	.then(() => {
		console.log("[server]: Connected to the database");
		app.listen(port, () => {
			console.log(`[server]: Server is running at http://localhost:${port}`);
		});
	})
	.catch((error) => {
		console.log("[server]: Error connecting to the database", error);
	});

app.use(router);
