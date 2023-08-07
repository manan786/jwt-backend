"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const helmet_1 = __importDefault(require("helmet"));
const Credential_1 = __importDefault(require("./middleware/Credential"));
const corsOptions_1 = __importDefault(require("./middleware/corsOptions"));
const config_1 = __importDefault(require("./config/config"));
// import {connectRedis} from "./utils/connectRedis";
const app = (0, express_1.default)();
// Use helmet middleware to set security headers (reduce the risk of various common attacks)
// helmet provides a strong layer of security
app.use((0, helmet_1.default)());
// add 'Access-Control-Allow-Credentials' in req header
// is an HTTP header that allows or denies the sharing of cookies, HTTP authentication
// When this header is set to true, it indicates that the server is willing to accept credentials (like cookies or HTTP authentication) in the cross-origin request
app.use(Credential_1.default);
//  middleware allows you to define which origins are allowed to access your server's resources
app.use((0, cors_1.default)(corsOptions_1.default));
// middleware to parse incoming JSON data from HTTP requests
// This is a security measure to prevent potential denial-of-service (DoS) attacks
app.use(express_1.default.json({ limit: "10kb" })); // you are restricting the size of the incoming JSON data to 10 kilobytes
// middleware used to parse HTTP request cookies and make them available on the req.cookies object.
app.use((0, cookie_parser_1.default)());
// 4. Logger
// if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
// 5. Routes
// app.use("/api/users", userRouter);
app.use("/api/auth", auth_route_1.default);
// app.use("/api/users", userRouter);
// 5. Testing
app.get("/api/healthChecker", (req, res, next) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to Devlixer!",
    });
});
// UnKnown Routes
app.all("*", (req, res, next) => {
    const err = new Error(`Routes ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
// Global Error Handler
app.use((err, req, res, next) => {
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});
const port = config_1.default.app.port || 4000;
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
    // ? call the connectDB function here
    // connectDB();
    // connectRedis();
});
//# sourceMappingURL=app.js.map