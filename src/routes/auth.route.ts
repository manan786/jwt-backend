import express from "express";
import {
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
} from "../controllers/auth.controller";
import validate from "../schemas/schema.validate";
import {
  createUserSchema,
  loginUserSchema,
} from "../schemas/schema.createUser";
import { authenticate } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";

const router = express.Router();

router.post("/register", validate(createUserSchema), registerHandler);

router.post("/login", validate(loginUserSchema), loginHandler);

router.get("/refresh", refreshHandler);

router.use(authenticate, requireUser);

router.get("/logout", logoutHandler);

export default router;
