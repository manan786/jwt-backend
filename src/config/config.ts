type configProps = {
    app: {
        port: number;
        origin: string;
        NODE_ENV: string | undefined;
    };
    db: {
        dbName: string | undefined;
        dbPass: string | undefined;
        db: string | undefined;
    };
    auth: {
        accessTokenPrivateKey: string | undefined;
        accessTokenPublicKey: string | undefined;
        refreshTokenPrivateKey: string | undefined;
        refreshTokenPublicKey: string | undefined;
        accessTokenExpiresInMinutes: number; // 10 minutes
        refreshTokenExpiresInMinutes: number; // 1 day
        redisExpiresInMinutes: number;
        RedisHost: string | undefined;
    };
};

const config: configProps = {
    app: {
        port: 8000,
        origin: 'http://localhost:3000',
        NODE_ENV: process.env.NODE_ENV,
    },
    db: {
        dbName: process.env.MONGODB_USERNAME,
        dbPass: process.env.MONGODB_PASSWORD,
        db: process.env.MONGODB_DATABASE_NAME,
    },
    auth: {
        accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
        accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
        refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
        refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY,
        accessTokenExpiresInMinutes: 10, // 10 minutes
        refreshTokenExpiresInMinutes: 60 * 24, // 1 day
        redisExpiresInMinutes: 60,
        RedisHost: process.env.REDIS_HOST,
    },
};

export default config;
