"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const signJWT_1 = require("./signJWT");
const user_service_1 = require("../services/user.service");
const appError_1 = __importDefault(require("../utils/appError"));
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        let accessToken;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer ')) {
            accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        }
        else if ((_b = req.cookies) === null || _b === void 0 ? void 0 : _b.access_token) {
            accessToken = (_c = req.cookies) === null || _c === void 0 ? void 0 : _c.access_token;
        }
        if (!accessToken) {
            return next(new appError_1.default("You're not logged in!", 401));
        }
        const decoded = (yield (0, signJWT_1.verifyJWT)(accessToken, 'accessTokenPublicKey'));
        if (!decoded || !(decoded === null || decoded === void 0 ? void 0 : decoded.sub)) {
            return next(new appError_1.default("Token isn't valid", 401));
        }
        const user = yield (0, user_service_1.findUserById)(decoded === null || decoded === void 0 ? void 0 : decoded.sub);
        if (!user) {
            return next(new appError_1.default("User doesn't exist", 401));
        }
        res.locals.user = user;
        return next();
    }
    catch (err) {
        console.log(err);
        return next(new appError_1.default(err.message, 500));
    }
});
exports.authenticate = authenticate;
//# sourceMappingURL=deserializeUser.js.map