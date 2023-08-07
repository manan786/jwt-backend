import express from "express";
import { authenticate } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import {
  getUsersHandler,
  getMeHandler,
} from "../controllers/user.controller";
import { checkUser } from "../middleware/checkUser";

const router = express.Router();

router.use(authenticate, requireUser);

router.get("/", checkUser(["admin"]), getUsersHandler);

router.get("/me", getMeHandler);

export default router;
