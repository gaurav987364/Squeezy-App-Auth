import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verificationSchema,
} from "../../validators/authValidator";
import {
  ForgotPasswordService,
  LoginService,
  LogoutService,
  RegisterService,
  ResetPasswordService,
  VerifyUserEmailService,
} from "./authService";
import { HTTPSSTATUS } from "../../config/http.config";
import {
  clearAuthenticationCookies,
  setAuthtenticationCookies,
} from "../../utils/cookies/setCookies";
import { NotFoundExeption } from "../../utils/Error/ErrorTypes";

const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const body = registerSchema.parse({
      ...req.body,
    });

    const { user } = await RegisterService(body);

    return res.status(HTTPSSTATUS.OK).json({
      message: "User Registered Successfully.",
      user: user,
    });
  }
);

const loginUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    //check for user-agent
    const userAgent = req.headers["user-agent"];
    const body = loginSchema.parse({
      ...req.body,
      userAgent,
    });

    const { accessToken, refreshToken, user } = await LoginService(body);

    // set the access & refresh token to cookie
    return setAuthtenticationCookies({
      res,
      accessToken,
      refreshToken,
    })
      .status(HTTPSSTATUS.OK)
      .json({
        message: "User Logged in Successfully.",
        user,
      });
  }
);

// verify user email
const verifyUserEmail = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { code } = verificationSchema.parse(req.body);

    await VerifyUserEmailService(code);

    return res.status(HTTPSSTATUS.OK).json({
      message: "Email Verified Successfully.",
    });
  }
);

//forgot-password
const forgotPassword = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const email = emailSchema.parse(req.body.email);

    await ForgotPasswordService(email);

    return res.status(HTTPSSTATUS.OK).json({
      message: "Please Check Your E-mail.",
    });
  }
);

//reset-password
const resetPassword = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const body = resetPasswordSchema.parse(req.body);

    await ResetPasswordService(body);

    //we have to clear all cookies so that user ka session khatam homjaye or vi logout ho jaye
    return clearAuthenticationCookies(res).status(HTTPSSTATUS.OK).json({
      message: "Password Reset Successfully.",
    });
  }
);

//logout
const logout = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const sessionId = req.sessionId;

    if (!sessionId) {
      throw new NotFoundExeption("Session/id not found.");
    }

    await LogoutService(sessionId);
    return clearAuthenticationCookies(res).status(HTTPSSTATUS.OK).json({
      message: "Logged Out Successfully.",
    });
  }
);
export {
  registerUser,
  loginUser,
  verifyUserEmail,
  forgotPassword,
  resetPassword,
  logout,
};
