import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { loginSchema, registerSchema } from "../../validators/authValidator";
import { LoginService, RegisterService } from "./authService";
import { HTTPSSTATUS } from "../../config/http.config";

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
      ...req.body
    });

     const {accessToken,refreshToken,user} = await LoginService(body);

     // set the access & refresh token to cookie
  }
);

export { registerUser, loginUser };
