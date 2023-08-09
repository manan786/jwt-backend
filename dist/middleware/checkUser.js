"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const checkUser = (allowedRoles) => (req, res, next) => {
    const user = res.locals.user;
    if (!user || !allowedRoles.includes(user.role)) {
        return next(new appError_1.default('Forbidden - You are not authorized to access this resource.', 403));
    }
    return next();
};
exports.checkUser = checkUser;
//# sourceMappingURL=checkUser.js.map