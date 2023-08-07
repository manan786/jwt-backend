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
const auth_controller_1 = require("../controllers/auth.controller");
const schema_validate_1 = __importDefault(require("../schemas/schema.validate"));
const schema_createUser_1 = require("../schemas/schema.createUser");
const deserializeUser_1 = require("../middleware/deserializeUser");
const requireUser_1 = require("../middleware/requireUser");
const client_1 = require("@prisma/client");
const excludefields = ["password", "confirmpassword", "refreshToken"];
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post("/login", (0, schema_validate_1.default)(schema_createUser_1.loginUserSchema), auth_controller_1.loginHandler);
router.use(deserializeUser_1.authenticate, requireUser_1.requireUser);
router.get("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findMany({
        select: {
            username: true,
            email: true,
            role: true,
        },
    });
    res.json({ user: user });
}));
// router.post("/register", validate(createUserSchema), registerHandler);
// router.get("/refresh", refreshHandler);
// router.get("/logout", logoutHandler);
exports.default = router;
//# sourceMappingURL=auth.route.js.map