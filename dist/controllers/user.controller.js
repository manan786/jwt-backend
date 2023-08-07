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
// import { fetchUsers } from "../services/user.service";
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// const FetchUsers = async () => {
//   // store in cache
//   const cachedUsers = await redisClient.get("users");
//   if (cachedUsers) {
//     // The users are in Redis, so return them
//     return JSON.parse(cachedUsers);
//   } else {
//     // The users are not in Redis, so fetch them from the database
//     const users = await fetchUsers();
//     // Store the users in Redis
//     // redisClient.set("users", JSON.stringify(users), { EX: 2 * 60 });
//     return users;
//   }
// };
const getUsersHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({});
        // const users: User[] = await FetchUsers();
        //
        if (users) {
            return res.status(200).json({
                status: "success",
                message: (users === null || users === void 0 ? void 0 : users.length) > 0 ? "Users fetch successfully" : "No user found!",
                data: users,
            });
        }
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.getUsersHandler = getUsersHandler;
const getMeHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // get the user from the response
        const Loginuser = (_a = res.locals.user) !== null && _a !== void 0 ? _a : {};
        // fetch user from the db
        // const user: User | null = await prisma.user.findUnique({
        //   where: { id: Loginuser?.id },
        // });
        //
        if (Loginuser) {
            return res.status(200).json({
                status: "success",
                message: Loginuser ? "User fetch successfully" : "User not found!",
                data: Loginuser,
            });
        }
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.getMeHandler = getMeHandler;
//# sourceMappingURL=user.controller.js.map