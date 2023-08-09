"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globalVal_1 = require("@utils/globalVal");
const config_1 = __importDefault(require("@config/config"));
exports.default = (req, res, next) => {
    const origin = req.headers.origin;
    if (config_1.default.app.NODE_ENV === 'production' && !origin) {
        res.clearCookie('refresh_token');
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (origin && globalVal_1.allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    return next();
};
//# sourceMappingURL=Credential.js.map