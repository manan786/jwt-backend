"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// require("dotenv").config();
const express_1 = __importDefault(require("express"));
// import {connectRedis} from "./utils/connectRedis";
// import authRouter from "./src/routes/auth.route";
// import config from 'config';
// import { connectRedis } from "./src/connectRedis";
const app = (0, express_1.default)();
// app.use("/api/auth", authRouter);
// connectRedis();
// console.log(config.get<string>('dbName'))
app.get("/", (req, res, next) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to!",
    });
});
app.get("/api/healthChecker", (req, res, next) => {
    res.status(200).json({
        status: "success",
        message: "healthChecker",
    });
});
const port = 4000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
    // ? call the connectDB function here
    // connectDB();
});
//# sourceMappingURL=index.js.map