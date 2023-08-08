"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globalVal_1 = require("../utils/globalVal");
const config_1 = __importDefault(require("../config/config"));
// import AppError from "../utils/appError";
// credentials
exports.default = (req, res, next) => {
    const origin = req.headers.origin;
    // disable request at postman
    if (config_1.default.app.NODE_ENV == "production" && !origin) {
        res.clearCookie('refresh_token');
        return res.status(403).send();
    }
    // console.log(req.headers);
    // console.log(origin);
    if (origin && globalVal_1.allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    next();
};
//# sourceMappingURL=Credential.js.map