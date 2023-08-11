"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    app: {
        port: 4000,
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
        accessTokenExpiresInMinutes: 10,
        refreshTokenExpiresInMinutes: 60 * 24,
        redisExpiresInMinutes: 60,
        RedisHost: process.env.REDIS_HOST,
    },
};
exports.default = config;
//# sourceMappingURL=config.js.map