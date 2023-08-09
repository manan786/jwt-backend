import { NextFunction, Request, Response } from 'express';
// import { fetchUsers } from "../services/user.service";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// const FetchUsers = async () => {
//   // store in cache
//   const cachedUsers = await redisClient.get("users");
//   if (cachedUsers) {
//     // The users are in Redis, so return them
//     return JSON.parse(cachedUsers);
//   } else {
//     // The users are not in Redis, so fetch them from the database
//     const users = await fetchUsers();

//     // Store the users in Redis
//     // redisClient.set("users", JSON.stringify(users), { EX: 2 * 60 });

//     return users;
//   }
// };

export const getUsersHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await prisma.user.findMany({
            select: { email: true, username: true, role: true },
        });
        // const users: User[] = await FetchUsers();
        return res.status(200).json({
            status: 'success',
            message:
                users?.length > 0
                    ? 'Users fetch successfully'
                    : 'No user found!',
            data: users,
        });
    } catch (err: any) {
        console.log(err);
        return next(err);
    }
};
export const getMeHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // get the user from the response
        const Loginuser = res.locals.user ?? {};

        // fetch user from the db
        // const user: User | null = await prisma.user.findUnique({
        //   where: { id: Loginuser?.id },
        // });
        return res.status(200).json({
            status: 'success',
            message: Loginuser ? 'User fetch successfully' : 'User not found!',
            data: Loginuser ?? null,
        });
    } catch (err: any) {
        console.log(err);
        return next(err);
    }
};
