import { config } from "../../config/app.config";
import bcrypt from "bcrypt";
import { HTTPSSTATUS } from "../../config/http.config";
import { sendEmail } from "../../mailers/mailer";
import {
  passwordResetTemplate,
  verifyEmailTemplate,
} from "../../mailers/templates/template";
import SessionModel from "../../models/sessionModel";
import UserModel from "../../models/userModel";
import VerificationModel from "../../models/verificationCodeModel";

import { ErrorCode, VerificationTypes } from "../../utils/constants/constants";

import {
  BadRequestException,
  Httpsexception,
  InternalServerException,
  NotFoundExeption,
  UnAuthorizedexception,
} from "../../utils/Error/ErrorTypes";

import {
  AfterFortyFiveMinutes,
  afterOneHour,
  calculateExpirationDate,
  threeMinutesAgo,
} from "../../utils/helper";
import { LoginDataProps, RegisterDataProps } from "../../utils/interface/types";
import {
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signJwtToken,
  verifyJwtToken,
} from "../../utils/jwt/jwt";

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
  const verificationURL = `${config.APP_ORIGIN}/confirm-accout?code=${verificationCode.code}`;

  //using resend
  await sendEmail({
    to: newUser.email,
    ...verifyEmailTemplate(verificationURL),
  });

  return {
    user: newUser,
  };
};

export const LoginService = async (body: LoginDataProps) => {
  const { email, password, userAgent } = body;
  // console.log(userAgent); // for our use;

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

//verify-email-service
export const VerifyUserEmailService = async (code: string) => {
  //first we check code is valid or not
  const isValidCode = await VerificationModel.findOne({
    code: code,
    type: VerificationTypes.EMAIL_VERIFICATION,
    expiresAt: { $gt: new Date() }, // means that code expire time > new Date() , means now time ok;
  });

  // if code is not valid
  if (!isValidCode) {
    throw new BadRequestException("Invalid Code.");
  }

  // now that code contain the user id so we find user using that;
  const updatedUser = await UserModel.findByIdAndUpdate(
    isValidCode.userId, // for that user
    {
      isEmailVerified: true, // update this property;
    },
    { new: true } //giver user after update;
  );

  // check error
  if (!updatedUser) {
    throw new BadRequestException(
      "Email is Not Verified.Please try again Later.",
      ErrorCode.VALIDATION_ERROR
    );
  }

  // after verify code and update verify email term to user delete that code from collection
  await isValidCode.deleteOne();
  return {
    user: updatedUser,
  };
};

//forgot-password-service
export const ForgotPasswordService = async (email: string) => {
  //first find user rlated to that mail
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    throw new NotFoundExeption("User Not Found.");
  }

  // check mail for rate limit 2 times only in 3 minutes;
  const timeAgo = threeMinutesAgo();
  const maxAttempts = 2;

  // find count
  const count = await VerificationModel.countDocuments({
    userId: user._id,
    type: VerificationTypes.PASSWORD_RESET,
    createdAt: { $gt: timeAgo }, //counts only documen created after this
  });

  if (count >= maxAttempts) {
    throw new Httpsexception(
      "Too Many Attempts, Try Again Later",
      HTTPSSTATUS.TOO_MANY_REQUESTS,
      ErrorCode.AUTH_TOO_MANY_ATTEMPTS
    );
  }

  // set expires
  const expiresAt = afterOneHour();

  // now create an collection with code type password-reset
  const validCode = await VerificationModel.create({
    userId: user._id,
    type: VerificationTypes.PASSWORD_RESET,
    expiresAt, // setting to after 1 hour
  });

  // now we have to redirect user to reset-password page;
  const resetLink = `${config.APP_ORIGIN}/reset-password?code=${validCode.code}$exp=${expiresAt.getTime()}`;

  const { data, error } = await sendEmail({
    to: user.email,
    ...passwordResetTemplate(resetLink),
  });

  if (!data?.id) {
    throw new InternalServerException(`${error?.name} ${error?.message}`);
  }

  return {
    url: resetLink,
    emailId: data.id,
  };
};

//reset-password-service
export const ResetPasswordService = async (body: any) => {
  const { password, verificationCode } = body;

  //find valid code or match user code
  const isValidCode = await VerificationModel.findOne({
    code: verificationCode,
    type: VerificationTypes.PASSWORD_RESET,
    expiresAt: { $gt: new Date() },
  });

  if (!isValidCode) {
    throw new NotFoundExeption("Invalid Code or Expired Code.");
  }

  //now hashing the user new password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //find user
  const updatedUser = await UserModel.findByIdAndUpdate(isValidCode.userId, {
    password: hashPassword,
  });

  if (!updatedUser) {
    throw new BadRequestException("Failed to reset password.");
  }

  //delete used code from collection
  await isValidCode.deleteOne();

  //delete all active session for the user whose passsword is updated;
  //doing this step is part of security best practice, as user update their password so he hase to login again mean we delete their all sesions;
  await SessionModel.deleteMany({
    userId: updatedUser._id,
  });

  return {
    user: updatedUser,
  };
};

//logout-service
export const LogoutService = async (sessionId: string) => {
  return await SessionModel.findByIdAndDelete(sessionId);
};

//re-new access token using refresh token
export const RenewAccessTokenService = async (refreshToken: string) => {
  //verify old token
  const { payload } = verifyJwtToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });

  if (!payload) {
    throw new UnAuthorizedexception("Invalid Refresh Token.");
  }

  //find session with payload.sessionId
  const session = await SessionModel.findById(payload.sessionId);

  if (!session) {
    throw new UnAuthorizedexception("Session Does Not Exists.");
  }
  //now (current date & time)
  const now = Date.now();
  // this code is checks for is the refresh token is valid or not or expires , if expires genertae new and set, if not require then it gives false;
  const sessionRequireRefresh =
    session.expiresAt.getTime() - now <= 24 * 60 * 60 * 1000; // 1 day in milliseconds

  if (sessionRequireRefresh) {
    //update the time of session
    session.expiresAt = calculateExpirationDate(config.JWT.REFRESH_EXPIRES_IN);

    // save session details
    await session.save();
  }

  //make new refrsh token
  const newRefreshtoken = sessionRequireRefresh
    ? signJwtToken(
        {
          sessionId: session._id,
        },
        refreshTokenSignOptions
      )
    : undefined;

  //new access token
  const newAccessToken = signJwtToken({
    userId: session.userId,
    sessionId: session._id,
  });

  return {
    newAccessToken,
    newRefreshtoken,
  };
};
