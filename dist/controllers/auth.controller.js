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
exports.logoutHandler = exports.refreshHandler = exports.loginHandler = exports.registerHandler = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const appError_1 = __importDefault(require("../utils/appError"));
const user_service_1 = require("../services/user.service");
const signJWT_1 = require("../middleware/signJWT");
const config_1 = __importDefault(require("../config/config"));
const prisma = new client_1.PrismaClient();
const accessTokenCookiesOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(Date.now() + config_1.default.auth.accessTokenExpiresInMinutes * 60 * 1000), // Cookie will expire after 24 hours
    // maxAge: 86400000, // Cookie will expire after 24 hours
};
const refreshTokenCookiesOptions = {
    httpOnly: true,
    secure: config_1.default.app.NODE_ENV == "production" ? true : false,
    sameSite: "strict",
    expires: new Date(Date.now() + config_1.default.auth.refreshTokenExpiresInMinutes * 60 * 1000), // Cookie will expire after 24 hours
    // maxAge: 86400000, // Cookie will expire after 24 hours
};
const registerHandler = (
//representing the shape of the expected request body for creating a user
req, // define containing the required properties for req.body
// req: Request<{}, {}, Prisma.UserCreateInput>, // define containing the required properties for req.body
res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // create user-input object
        // const userObj: User = req.body;
        const userObj = req.body;
        // Hash the password using bcrypt
        const hashedPassword = yield bcrypt_1.default.hash(userObj.password, 10);
        // Replace the password with the hashed password
        userObj.password = hashedPassword;
        // userObj.refreshToken = [];
        // create user
        const user = yield prisma.user.create({
            data: userObj,
        });
        //
        if (user) {
            return res.status(200).json({
                status: "success",
                message: "User created successfully",
            });
        }
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.registerHandler = registerHandler;
const loginHandler = (
//representing the shape of the expected request body for creating a user
req, // define containing the required properties for req.body
res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies.refresh_token;
    const { email, password } = req.body;
    try {
        // Find the user in the database by email
        const user = yield prisma.user.findUnique({
            where: { email: email },
        });
        // Check if the user exists and the password is correct
        if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
            return next(new appError_1.default("Invalid email or password", 401));
        }
        // Generate tokens
        const { accessToken, refreshToken } = yield (0, user_service_1.signToken)({ id: user === null || user === void 0 ? void 0 : user.id });
        // store token in the database
        let RefreshTokenArr = user.refreshToken;
        if (cookies) {
            RefreshTokenArr = RefreshTokenArr === null || RefreshTokenArr === void 0 ? void 0 : RefreshTokenArr.filter((RT) => RT !== cookies);
            res.clearCookie("refresh_token", Object.assign({}, refreshTokenCookiesOptions));
        }
        //
        res.removeHeader("Set-Cookie");
        res.cookie("refresh_token", refreshToken, Object.assign({}, refreshTokenCookiesOptions));
        RefreshTokenArr.push(refreshToken);
        // Update in db
        yield prisma.user.update({
            where: { id: user.id },
            data: {
                refreshToken: {
                    set: RefreshTokenArr,
                },
            },
        });
        //
        // Send the tokens in the response
        return res.status(200).json({
            message: "success",
            accessToken,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.loginHandler = loginHandler;
const refreshHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
        return next(new appError_1.default("Token isn't valid!", 401));
    }
    try {
        // clear response cookies
        res.clearCookie("refresh_token", Object.assign({}, refreshTokenCookiesOptions));
        const userInfo = yield prisma.user.findFirst({
            where: {
                refreshToken: {
                    has: refreshToken,
                },
            },
            select: {
                id: true,
                refreshToken: true,
            },
        });
        // validating token
        if (!userInfo) {
            const tokenDT = (yield (0, signJWT_1.verifyJWT)(refreshToken, "refreshTokenPublicKey"));
            if (!tokenDT) {
                return next(new appError_1.default("Token isn't valid", 403));
            }
            else {
                yield prisma.user.update({
                    where: { id: tokenDT.sub },
                    data: {
                        refreshToken: {
                            set: [],
                        },
                    },
                });
                return next(new appError_1.default("Unauthorized!", 403));
            }
        }
        const newRefreshTokenArray = userInfo.refreshToken.filter((rt) => rt !== refreshToken);
        (0, signJWT_1.verifyJWT)(refreshToken, "refreshTokenPublicKey")
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            const { accessToken, refreshToken } = yield (0, user_service_1.signToken)({
                id: userInfo === null || userInfo === void 0 ? void 0 : userInfo.id,
            });
            newRefreshTokenArray.push(refreshToken);
            yield prisma.user.update({
                where: { id: userInfo === null || userInfo === void 0 ? void 0 : userInfo.id },
                data: {
                    refreshToken: {
                        set: newRefreshTokenArray,
                    },
                },
            });
            res.removeHeader("Set-Cookie");
            res.cookie("refresh_token", refreshToken, Object.assign({}, refreshTokenCookiesOptions));
            return res.status(200).json({
                message: "success",
                accessToken,
            });
        }))
            .catch((tokenErr) => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma.user.update({
                where: { id: userInfo === null || userInfo === void 0 ? void 0 : userInfo.id },
                data: {
                    refreshToken: {
                        set: newRefreshTokenArray,
                    },
                },
            });
            return next(new appError_1.default("Unauthorized", 403));
        }));
        // check user login session
        // const CheckUserSession = await redisClient.get(decoded.sub);
        // if (!CheckUserSession) {
        //   return next(new AppError("Expire User Session!", 401));
        // }
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.refreshHandler = refreshHandler;
const logoutHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.sendStatus(204);
        }
        const userInfo = yield prisma.user.findFirst({
            where: {
                refreshToken: {
                    has: refreshToken,
                },
            },
            select: {
                id: true,
                refreshToken: true,
            },
        });
        if (!userInfo) {
            res.clearCookie("refresh_token", Object.assign({}, refreshTokenCookiesOptions));
            return res.sendStatus(204);
        }
        const newRefreshTokenArray = userInfo.refreshToken.filter((rt) => rt !== refreshToken);
        yield prisma.user.update({
            where: { id: userInfo === null || userInfo === void 0 ? void 0 : userInfo.id },
            data: {
                refreshToken: {
                    set: newRefreshTokenArray,
                },
            },
        });
        //
        res.clearCookie("refresh_token", Object.assign({}, refreshTokenCookiesOptions));
        // remove user from locally
        res.locals.user = null;
        res.status(204); // 204 no-content status
    }
    catch (err) {
        next(err);
    }
});
exports.logoutHandler = logoutHandler;
//# sourceMappingURL=auth.controller.js.map