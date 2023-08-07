export default {
  port: 8000,
  accessTokenExpiresInMinutes: 10, // 10 minutes
  refreshTokenExpiresInMinutes: 60 * 24, // 1 day
  redisExpiresInMinutes: 60,
  origin: "http://localhost:3000",
};
