import SessionModel from "../../models/sessionModel";
import UserModel from "../../models/userModel";
import VerificationModel from "../../models/verificationCodeModel";

import { ErrorCode, VerificationTypes } from "../../utils/constants/constants";

import {
  BadRequestException,
  NotFoundExeption,
} from "../../utils/Error/ErrorTypes";

import { AfterFortyFiveMinutes } from "../../utils/helper";
import { LoginDataProps, RegisterDataProps } from "../../utils/interface/types";
import { refreshTokenSignOptions, signJwtToken } from "../../utils/jwt/jwt";

export const RegisterService = async (body: RegisterDataProps) => {
  const { name, email, password } = body;

  if (!name || !email || !password) {
    throw new Error("All credentials required.");
  }

  //find user if all things are ok
  const user = await UserModel.exists({ email });

  // if user already exixts with same email so send error
  if (user) {
    throw new BadRequestException(
      "User Already Exixts with Email.",
      ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
    );
  }

  // if user email differnent hai to create new user and save to db;
  const newUser = await UserModel.create({
    name,
    email,
    password,
  });

  // get user id
  const userId = newUser._id;

  //create verification code collection based on user id;
  const verificationCode = await VerificationModel.create({
    userId,
    type: VerificationTypes.EMAIL_VERIFICATION,
    expiresAt: AfterFortyFiveMinutes(),
  });
  //send code to user email

  return {
    user: newUser,
  };
};

export const LoginService = async (body: LoginDataProps) => {
  const { email, password, userAgent } = body;
  console.log(userAgent); // for our use;

  //find that user with email
  const user = await UserModel.findOne({ email });

  //if there is no any user throw error
  if (!user) {
    throw new NotFoundExeption(
      "User Not Found.",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  // check and verify the password is corrent
  const isValidPassword = await user.comparePasswords(password);

  //if password is not match throw error
  if (!isValidPassword) {
    throw new BadRequestException(
      "Bad Credentials.",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  //if user is found and has valid password we have to create session collection
  const session = await SessionModel.create({
    userId: user._id,
    userAgent,
  });

  //after create session collection , create access token
  const accessToken = signJwtToken({
    userId: user._id,
    sessionId: session._id,
  });

  // after accestoken we create refresh token
  const refreshToken = signJwtToken(
    {
      sessionId: session._id,
    },
    refreshTokenSignOptions
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};
