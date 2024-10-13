import express, { Express } from "express";
import mongoose from "mongoose";
import router from "./routes/get";

const app: Express = express();
const port = process.env.PORT || 3000;
const mongoUrl = "mongodb://localhost:27017/test3";


mongoose
  .connect(mongoUrl)
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