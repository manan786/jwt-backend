"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const schema_validate_1 = __importDefault(require("../schemas/schema.validate"));
const schema_createUser_1 = require("../schemas/schema.createUser");
const deserializeUser_1 = require("../middleware/deserializeUser");
const requireUser_1 = require("../middleware/requireUser");
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
const router = express_1.default.Router();
// router.post("/login",  (req: Request, res: Response, next: NextFunction) => {
//   res.json({ user: req.body });
// });
// router.get(
//   "/register",
//   async (req: Request, res: Response, next: NextFunction) => {
//     const user = await prisma.user.findMany({
//       select: {
//         username: true,
//         email: true,
//         role: true,
//       },
//     });
//     res.json({ user: user });
//   }
// );
router.post("/register", (0, schema_validate_1.default)(schema_createUser_1.createUserSchema), auth_controller_1.registerHandler);
router.post("/login", (0, schema_validate_1.default)(schema_createUser_1.loginUserSchema), auth_controller_1.loginHandler);
// router.use(authenticate, requireUser);
router.get("/refresh", deserializeUser_1.authenticate, requireUser_1.requireUser, auth_controller_1.refreshHandler);
router.get("/logout", deserializeUser_1.authenticate, requireUser_1.requireUser, auth_controller_1.logoutHandler);
exports.default = router;
//# sourceMappingURL=auth.route.js.map