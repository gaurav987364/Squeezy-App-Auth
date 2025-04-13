import { Router } from "express";
import {
  loginUser,
  registerUser,
  verifyUserEmail,
  forgotPassword,
} from "../controllers/auth/authController";

const authRoute = Router();

//register
authRoute.post("/register", registerUser);

//login
authRoute.post("/login", loginUser);

//verify-email
authRoute.post("/verify/email", verifyUserEmail);

//password-forgot
authRoute.post("/password/forgot", forgotPassword);
//password-reset
export default authRoute;
