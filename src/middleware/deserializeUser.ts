import { NextFunction, Request, Response } from 'express';
import { verifyJWT } from '../middleware/signJWT';
import { findUserById } from '../services/user.service';
import AppError from '../utils/appError';
export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let accessToken;
        // Get the token from the request headers or query parameters or cookies
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer ')
        ) {
            accessToken = req.headers.authorization?.split(' ')[1];
        } else if (req.cookies?.access_token) {
            accessToken = req.cookies?.access_token;
        }

        if (!accessToken) {
            return next(new AppError("You're not logged in!", 401));
        }

        // Verify the token
        const decoded = (await verifyJWT(
            accessToken,
            'accessTokenPublicKey'
        )) as {
            sub: string;
        };

        if (!decoded || !decoded?.sub) {
            return next(new AppError("Token isn't valid", 401));
        }

        // verify the user session with the help of redis
        // const CheckUserSession = await redisClient.get(decoded.sub);
        // if (!CheckUserSession) {
        //   return next(new AppError("Expire User Session!", 401));
        // }

        // verify the user provided
        const user = await findUserById(decoded?.sub);
        if (!user) {
            return next(new AppError("User doesn't exist", 401));
        }

        // store the user in the response
        res.locals.user = user;

        return next();
    } catch (err: any) {
        console.log(err);
        return next(new AppError(err.message, 500));
    }
};
