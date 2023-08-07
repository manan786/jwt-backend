"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
// import {connectRedis} from "./utils/connectRedis";
// import authRouter from "./src/routes/auth.route";
// import { connectRedis } from "./src/connectRedis";
const config_1 = __importDefault(require("./config/config"));
const app = (0, express_1.default)();
// app.use("/api/auth", authRouter);
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
const port = ((_a = config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.app) === null || _a === void 0 ? void 0 : _a.port) || 4000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
    // ? call the connectDB function here
    // connectDB();
});
//# sourceMappingURL=index.js.map