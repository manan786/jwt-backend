import express, { Request,Response,NextFunction } from "express";
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
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const router = express.Router();

router.post("/login",  (req: Request, res: Response, next: NextFunction) => {
  res.json({ user: req.body });
});

router.get(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findMany({
      select: {
        username: true,
        email: true,
        role: true,
      },
    });
    res.json({ user: user });
  }
);
// router.post("/register", validate(createUserSchema), registerHandler);

// router.post("/login", validate(loginUserSchema), loginHandler);

// router.use(authenticate, requireUser);

// router.get("/refresh", refreshHandler);

// router.get("/logout", logoutHandler);

export default router;
