// require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
// import {connectRedis} from "./utils/connectRedis";
// import authRouter from "./src/routes/auth.route";
// import config from 'config';
// import { connectRedis } from "./src/connectRedis";
const app = express();

// app.use("/api/auth", authRouter);

// connectRedis();
// console.log(config.get<string>('dbName'))
app.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: "success",
      message: "Welcome to!",
    });
  }
);

app.get(
  "/api/healthChecker",
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: "success",
      message: "healthChecker",
    });
  }
);

const port = 4000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  // ? call the connectDB function here
  // connectDB();
});
