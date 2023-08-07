"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalVal_1 = require("../utils/globalVal");
// import AppError from "../utils/appError";
// credentials
exports.default = (req, res, next) => {
    const origin = req.headers.origin;
    // disable request at postman
    // if (config.app.NODE_ENV == "production" && !origin) {
    //   res.clearCookie('refresh_token');
    //   return res.status(403).send();
    // }
    // console.log(req.headers);
    // console.log(origin);
    if (origin && globalVal_1.allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    next();
};
//# sourceMappingURL=Credential.js.map