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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeHandler = exports.getUsersHandler = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUsersHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({
            select: { email: true, username: true, role: true },
        });
        return res.status(200).json({
            status: 'success',
            message: (users === null || users === void 0 ? void 0 : users.length) > 0
                ? 'Users fetch successfully'
                : 'No user found!',
            data: users,
        });
    }
    catch (err) {
        console.log(err);
        return next(err);
    }
});
exports.getUsersHandler = getUsersHandler;
const getMeHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const Loginuser = (_a = res.locals.user) !== null && _a !== void 0 ? _a : {};
        return res.status(200).json({
            status: 'success',
            message: Loginuser ? 'User fetch successfully' : 'User not found!',
            data: Loginuser !== null && Loginuser !== void 0 ? Loginuser : null,
        });
    }
    catch (err) {
        console.log(err);
        return next(err);
    }
});
exports.getMeHandler = getMeHandler;
//# sourceMappingURL=user.controller.js.map