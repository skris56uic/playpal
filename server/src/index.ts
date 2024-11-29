import express, { Express } from "express";
import mongoose from "mongoose";
import router from "./routes/get";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Express = express();
const port = process.env.PORT || 3000;
const mongoUrl = "mongodb://localhost:27017/playpal";
// const mongoUrl =
//   "mongodb+srv://skris56:rhythpic%40123@rhythpic.0wk5z.mongodb.net/playpal?retryWrites=true&w=majority&appName=rhythpic";

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    // origin: "https://playpal-ydmy.onrender.com",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
    maxAge: 600,
  })
);

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("[server]: Connected to the database");
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.log("[server]: Error connecting to the database", error);
  });

app.use(router);
