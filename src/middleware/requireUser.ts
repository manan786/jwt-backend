import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
// import AppError from "../"
export const requireUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (user) {
    // console.log("user",user)
    // If authentication is successful, store the user object in res.locals
    next(); // Proceed to the next middleware or route handler
  } else {
    return next(new AppError("Authentication failed", 401));
  }
};
