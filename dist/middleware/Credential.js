"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalVal_1 = require("../utils/globalVal");
exports.default = (req, res, next) => {
    const origin = req.headers.origin;
    if (origin && globalVal_1.allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    return next();
};
//# sourceMappingURL=Credential.js.map