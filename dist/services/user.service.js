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
exports.signToken = exports.fetchUsers = exports.findUserById = void 0;
const client_1 = require("@prisma/client");
const signJWT_1 = require("../middleware/signJWT");
const config_1 = __importDefault(require("../config/config"));
const helperFunction_1 = require("../utils/helperFunction");
const prisma = new client_1.PrismaClient();
const excludefields = ["password", "confirmpassword", "refreshToken"];
const findUserById = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: { id: userID },
    });
    return (0, helperFunction_1.excludeSensitiveFields)(user, excludefields);
});
exports.findUserById = findUserById;
const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findMany({
        select: {
            email: true,
            username: true,
            role: true,
        },
    });
});
exports.fetchUsers = fetchUsers;
const signToken = (user) => {
    const accessToken = (0, signJWT_1.signJWT)({ sub: user === null || user === void 0 ? void 0 : user.id }, "accessTokenPrivateKey", {
        expiresIn: `${config_1.default.auth.accessTokenExpiresInMinutes}m`,
    });
    const refreshToken = (0, signJWT_1.signJWT)({ sub: user === null || user === void 0 ? void 0 : user.id }, "refreshTokenPrivateKey", {
        expiresIn: `${config_1.default.auth.refreshTokenExpiresInMinutes}m`,
    });
    // create a redis session
    // redisClient.set(user?.id, JSON.stringify(user), {
    //   EX: config.get<number>("redisExpiresInMinutes") * 60,
    // });
    return { accessToken, refreshToken };
};
exports.signToken = signToken;
//# sourceMappingURL=user.service.js.map