import { Router } from "express";
import {
  loginUser,
  registerUser,
  verifyUserEmail,
  forgotPassword,
  resetPassword,
  logout,
} from "../controllers/auth/authController";
import { authenticateJWT } from "../strategies/jwt-strategy";

const authRoute = Router();

//register
authRoute.post("/register", registerUser);

//login
authRoute.post("/login", loginUser);

//verify-email
authRoute.post("/verify/email", verifyUserEmail);

//password-forgot
authRoute.post("/password/forgot", forgotPassword);

//reset-password
authRoute.post("/password/reset", resetPassword);

//logout
authRoute.post("/logout", authenticateJWT, logout);

export default authRoute;
