import { CookieOptions, Response } from "express";
import { config } from "../../config/app.config";
import { cookiesPyaloadProps } from "../interface/types";
import { calculateExpirationDate } from "../helper";

// cookie path => path for getting new access token
export const REFRESH_PATH: string = `${config.BASE_PATH}/auth/refresh`;

// default options for setting cookies
const defaults: CookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production" ? true : false,
  sameSite: config.NODE_ENV === "production" ? "strict" : "lax",
};

// get refresh token cookies option function (option setter funtion for cookie)
export const getRefreshTokenCookiesOptions = (): CookieOptions => {
  const expiresIn = config.JWT.REFRESH_EXPIRES_IN;
  const expires = calculateExpirationDate(expiresIn);
  return {
    ...defaults, // adding the defaults option as well
    expires,
    path: REFRESH_PATH,
  };
};

// get access token cookies option function (option setter funtion for cookie)
export const getAccessTokenCookiesOptions = (): CookieOptions => {
  const expiresIn = config.JWT.EXPIRES_IN;
  const expires = calculateExpirationDate(expiresIn);
  return {
    ...defaults, // adding the defaults option as well
    expires,
    path: "/",
  };
};

// set authentication cookies :-
export const setAuthtenticationCookies = ({
  res,
  accessToken,
  refreshToken,
}: cookiesPyaloadProps): Response => {
  return res
    .cookie("accessToken", accessToken, getAccessTokenCookiesOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookiesOptions());
};
// means just like normally , set the cookies to user now we have to set cookies in best practice

//clear cookies function
export const clearAuthenticationCookies = (res: Response): Response => {
  return res.clearCookie("accessToken").clearCookie("refreshToken", {
    path: REFRESH_PATH, //read below
  });
};

//clearing the refreshToken with a specific path (like REFESH_PATH) ensures that any path-specif token cant be reused to generate new acces token
