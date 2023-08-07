import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

// authMiddleware.js (or any other appropriate file)
export const checkUser =
  (allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    // Assuming you have a user object stored in the request (e.g., after authentication)
    const user = res.locals.user;

    // Check if the user exists and if their role matches any of the allowed roles
    if (!user || !allowedRoles.includes(user.role)) {
      return next(
        new AppError(
          "Forbidden - You are not authorized to access this resource.",
          403
        )
      );
    }

    // User is authorized, proceed to the next middleware or route handler
    next();
  };
