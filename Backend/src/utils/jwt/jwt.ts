import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { config } from "../../config/app.config";
import { UserDocument } from "../../models/userModel";
import { SessionDocument } from "../../models/sessionModel";

// access token data types
export interface AccessTokenPayload {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
}

// refresh token data types
export interface RefreshTokenPayload {
  sessionId: SessionDocument["_id"];
}

// or custom type, sign options with secret key
type SignOptsAndSecretKey = SignOptions & { secret: string };

// make defaults object (Determines who can use the tokens for eg:user)
const defaults = {
  audience: ["user"],
};

// access token sign options
export const accessTokenSignOptions: SignOptsAndSecretKey = {
  expiresIn: 15 * 60 * 100, //15m
  secret: config.JWT.SECRET,
};

// refresh token sign options
export const refreshTokenSignOptions: SignOptsAndSecretKey = {
  expiresIn: 30 * 24 * 60 * 60 * 100, //30d
  secret: config.JWT.REFRESH_SECRET,
};

// make sign jwt function
export const signJwtToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptsAndSecretKey
) => {
  const { secret, ...opts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, {
    ...defaults,
    ...opts,
  });
};
