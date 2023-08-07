import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/register",async (req, res) => {
  const user = await prisma.user.findMany({});
  res.json({ mess: "register",user });
});

export default router;
