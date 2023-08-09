"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deserializeUser_1 = require("../middleware/deserializeUser");
const requireUser_1 = require("../middleware/requireUser");
const user_controller_1 = require("../controllers/user.controller");
const checkUser_1 = require("../middleware/checkUser");
const router = express_1.default.Router();
router.use(deserializeUser_1.authenticate, requireUser_1.requireUser);
router.get('/', (0, checkUser_1.checkUser)(['admin']), user_controller_1.getUsersHandler);
router.get('/me', user_controller_1.getMeHandler);
exports.default = router;
//# sourceMappingURL=user.route.js.map