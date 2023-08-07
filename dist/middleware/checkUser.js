"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
// authMiddleware.js (or any other appropriate file)
const checkUser = (allowedRoles) => (req, res, next) => {
    // Assuming you have a user object stored in the request (e.g., after authentication)
    const user = res.locals.user;
    // Check if the user exists and if their role matches any of the allowed roles
    if (!user || !allowedRoles.includes(user.role)) {
        return next(new appError_1.default("Forbidden - You are not authorized to access this resource.", 403));
    }
    // User is authorized, proceed to the next middleware or route handler
    next();
};
exports.checkUser = checkUser;
//# sourceMappingURL=checkUser.js.map