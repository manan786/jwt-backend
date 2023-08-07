import { Request, Response, NextFunction } from "express";
import { allowedOrigins } from "../utils/globalVal";
import config from "../config/config";
// import AppError from "../utils/appError";
// credentials
export default (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;

  // disable request at postman
  // if (config.app.NODE_ENV == "production" && !origin) {
  //   res.clearCookie('refresh_token');
  //   return res.status(403).send();
  // }
  // console.log(req.headers);
  // console.log(origin);
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  } 
  next();
};
