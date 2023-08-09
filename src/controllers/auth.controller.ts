import { PrismaClient } from '@prisma/client';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import AppError from '@utils/appError';
import { signToken } from '@services/user.service';
import { verifyJWT } from '@middleware/signJWT';
import config from '@config/config';
const prisma = new PrismaClient();

// const accessTokenCookiesOptions: CookieOptions = {
//   httpOnly: true, // Cookie will be accessible only on the server-side, not on the client-side using JavaScript.
//   secure: process.env.NODE_ENV === 'production', // Cookie will only be sent over HTTPS
//   sameSite: 'strict', // Cookie will be sent only in first-party contexts
//   expires: new Date(Date.now() + config.auth.accessTokenExpiresInMinutes * 60 * 1000) // Cookie will expire after 24 hours
//   // maxAge: 86400000, // Cookie will expire after 24 hours
// }

const refreshTokenCookiesOptions: CookieOptions = {
    httpOnly: true, // Cookie will be accessible only on the server-side, not on the client-side using JavaScript.
    secure: config.app.NODE_ENV === 'production' ? true : false, // Cookie will only be sent over HTTPS
    sameSite: 'strict', // Cookie will be sent only in first-party contexts
    expires: new Date(
        Date.now() + config.auth.refreshTokenExpiresInMinutes * 60 * 1000
    ), // Cookie will expire after 24 hours
    // maxAge: 86400000, // Cookie will expire after 24 hours
};

export const registerHandler = async (
    //representing the shape of the expected request body for creating a user
    req: Request, // define containing the required properties for req.body
    // req: Request<{}, {}, Prisma.UserCreateInput>, // define containing the required properties for req.body
    res: Response,
    next: NextFunction
) => {
    try {
        // create user-input object
        // const userObj: User = req.body;
        const userObj = req.body;

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(userObj.password, 10);

        // Replace the password with the hashed password
        userObj.password = hashedPassword;
        // userObj.refreshToken = [];

        // create user
        await prisma.user.create({
            data: userObj,
        });

        //
        return res.status(200).json({
            status: 'success',
            message: 'User created successfully',
        });
    } catch (err: any) {
        console.log(err);
        return next(err);
    }
};

export const loginHandler = async (
    //representing the shape of the expected request body for creating a user
    req: Request, // define containing the required properties for req.body
    res: Response,
    next: NextFunction
) => {
    const cookies = req.cookies.refresh_token;
    const { email, password } = req.body;
    try {
        // Find the user in the database by email
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        // Check if the user exists and the password is correct
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return next(new AppError('Invalid email or password', 401));
        }

        // Generate tokens
        const { accessToken, refreshToken } = await signToken({ id: user?.id });

        // store token in the database
        let RefreshTokenArr: string[] = user.refreshToken;

        if (cookies) {
            RefreshTokenArr = RefreshTokenArr?.filter(
                (RT: string) => RT !== cookies
            );
            res.clearCookie('refresh_token', {
                ...refreshTokenCookiesOptions,
            });
        }
        //
        res.removeHeader('Set-Cookie');
        res.cookie('refresh_token', refreshToken, {
            ...refreshTokenCookiesOptions,
        });
        RefreshTokenArr.push(refreshToken);

        // Update in db
        await prisma.user.update({
            where: { id: user.id },
            data: {
                refreshToken: {
                    set: RefreshTokenArr,
                },
            },
        });
        //

        // Send the tokens in the response
        return res.status(200).json({
            message: 'success',
            accessToken,
        });
    } catch (err: any) {
        console.log(err);
        return next(err);
    }
};

export const refreshHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
        return next(new AppError("Token isn't valid!", 401));
    }
    try {
        // clear response cookies
        res.clearCookie('refresh_token', {
            ...refreshTokenCookiesOptions,
        });

        const userInfo = await prisma.user.findFirst({
            where: {
                refreshToken: {
                    has: refreshToken,
                },
            },
            select: {
                id: true,
                refreshToken: true,
            },
        });
        // validating token
        if (!userInfo) {
            const tokenDT = (await verifyJWT(
                refreshToken,
                'refreshTokenPublicKey'
            )) as {
                sub: string;
            };
            if (!tokenDT) {
                return next(new AppError("Token isn't valid", 403));
            } else {
                await prisma.user.update({
                    where: { id: tokenDT.sub },
                    data: {
                        refreshToken: {
                            set: [],
                        },
                    },
                });
                return next(new AppError('Unauthorized!', 403));
            }
        }

        const newRefreshTokenArray = userInfo.refreshToken.filter(
            (rt) => rt !== refreshToken
        );

        return verifyJWT(refreshToken, 'refreshTokenPublicKey')
            .then(async () => {
                const { accessToken, refreshToken } = await signToken({
                    id: userInfo?.id,
                });
                newRefreshTokenArray.push(refreshToken);
                await prisma.user.update({
                    where: { id: userInfo?.id },
                    data: {
                        refreshToken: {
                            set: newRefreshTokenArray,
                        },
                    },
                });
                res.removeHeader('Set-Cookie');
                res.cookie('refresh_token', refreshToken, {
                    ...refreshTokenCookiesOptions,
                });
                return res.status(200).json({
                    message: 'success',
                    accessToken,
                });
            })
            .catch(async () => {
                await prisma.user.update({
                    where: { id: userInfo?.id },
                    data: {
                        refreshToken: {
                            set: newRefreshTokenArray,
                        },
                    },
                });
                return next(new AppError('Unauthorized', 403));
            });

        // check user login session
        // const CheckUserSession = await redisClient.get(decoded.sub);
        // if (!CheckUserSession) {
        //   return next(new AppError("Expire User Session!", 401));
        // }
    } catch (err: any) {
        console.log(err);
        return next(err);
    }
};

export const logoutHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.sendStatus(204);
        }
        const userInfo = await prisma.user.findFirst({
            where: {
                refreshToken: {
                    has: refreshToken,
                },
            },
            select: {
                id: true,
                refreshToken: true,
            },
        });
        if (!userInfo) {
            res.clearCookie('refresh_token', {
                ...refreshTokenCookiesOptions,
            });
            return res.sendStatus(204);
        }

        const newRefreshTokenArray = userInfo.refreshToken.filter(
            (rt) => rt !== refreshToken
        );
        await prisma.user.update({
            where: { id: userInfo?.id },
            data: {
                refreshToken: {
                    set: newRefreshTokenArray,
                },
            },
        });

        //
        res.clearCookie('refresh_token', {
            ...refreshTokenCookiesOptions,
        });

        // remove user from locally
        res.locals.user = null;

        return res.status(204); // 204 no-content status
    } catch (err) {
        return next(err);
    }
};
