import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth/authController";

const authRoute = Router();

//register
authRoute.post("/register", registerUser);

//login
authRoute.post("/login", loginUser);

export default authRoute;
