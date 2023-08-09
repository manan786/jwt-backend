import { PrismaClient } from '@prisma/client';
import { signJWT } from '@middleware/signJWT';
import config from '@config/config';
import { excludeSensitiveFields } from '@utils/helperFunction';
const prisma = new PrismaClient();

const excludefields = ['password', 'confirmpassword', 'refreshToken'];

export const findUserById = async (userID: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userID },
    });
    return excludeSensitiveFields(user, excludefields);
};

export const fetchUsers = async () => {
    return await prisma.user.findMany({
        select: {
            email: true,
            username: true,
            role: true,
        },
    });
};
export const signToken = (user: { id: string }) => {
    const accessToken = signJWT({ sub: user?.id }, 'accessTokenPrivateKey', {
        expiresIn: `${config.auth.accessTokenExpiresInMinutes}m`,
    });

    const refreshToken = signJWT({ sub: user?.id }, 'refreshTokenPrivateKey', {
        expiresIn: `${config.auth.refreshTokenExpiresInMinutes}m`,
    });

    // create a redis session
    // redisClient.set(user?.id, JSON.stringify(user), {
    //   EX: config.get<number>("redisExpiresInMinutes") * 60,
    // });

    return { accessToken, refreshToken };
};
