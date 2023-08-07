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
const express_1 = __importDefault(require("express"));
// import {
//   loginHandler,
//   logoutHandler,
//   refreshHandler,
//   registerHandler,
// } from "../controllers/auth.controller";
// import validate from "../schemas/schema.validate";
// import {
//   createUserSchema,
//   loginUserSchema,
// } from "../schemas/schema.createUser";
// import { authenticate } from "../middleware/deserializeUser";
// import { requireUser } from "../middleware/requireUser";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
const router = express_1.default.Router();
router.post("/login", (req, res, next) => {
    res.json({ user: req.body });
});
router.get("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = await prisma.user.findMany({
    //   select: {
    //     username: true,
    //     email: true,
    //     role: true,
    //   },
    // });
    res.json({ user: "user" });
}));
// router.post("/register", validate(createUserSchema), registerHandler);
// router.post("/login", validate(loginUserSchema), loginHandler);
// router.use(authenticate, requireUser);
// router.get("/refresh", refreshHandler);
// router.get("/logout", logoutHandler);
exports.default = router;
//# sourceMappingURL=auth.route.js.map