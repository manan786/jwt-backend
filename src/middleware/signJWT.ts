import { SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import config from "../config/config";
export const signJWT = (
  payload: { sub: string },
  key: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions = {}
) => {
  const privateKey = Buffer.from(config.auth?.[key], "base64").toString(
    "ascii"
  );
  return jwt.sign(payload, privateKey, {
    ...options,
    algorithm: "RS256",
  });
};

export const verifyJWT = async (token: string, key: 'accessTokenPublicKey'|'refreshTokenPublicKey' ) => {
  try {
    const publicKey = Buffer.from(config.auth?.[key], "base64").toString(
      "ascii"
    );
    return await jwt.verify(token, publicKey);
  } catch (e) {
    console.log(e)
    return null;
    // throw new Error("Invalid Token!");
  }
};
