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
exports.loginUserSchema = exports.createUserSchema = void 0;
const client_1 = require("@prisma/client");
const joi_1 = __importDefault(require("joi"));
const globalVal_1 = require("../utils/globalVal");
const prisma = new client_1.PrismaClient();
const checkEmailUniqueness = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (users) {
        const error = new Error("Email already exists");
        error.statusCode = 409;
        throw error;
    }
});
// Define the Joi schema with type annotations
exports.createUserSchema = joi_1.default.object({
    username: joi_1.default.string().alphanum().min(3).max(30).required(),
    email: joi_1.default.string().email().required().external(checkEmailUniqueness),
    password: joi_1.default.string().min(6).required(),
    role: joi_1.default.string().valid(...globalVal_1.allowedRoles).messages({
        'any.only': "User role isn't valid!",
    }),
    confirmpassword: joi_1.default.string().valid(joi_1.default.ref("password")).required().strict(),
});
exports.loginUserSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
});
//# sourceMappingURL=schema.createUser.js.map