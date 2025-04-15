import cors from "cors";
import express, { Request, Response } from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import { asyncHandler } from "./middlewares/asyncHandler";
import { config } from "./config/app.config";
import { HTTPSSTATUS } from "./config/http.config";
import connectDB from "./database/db";
import { errorHandler } from "./middlewares/errorHandler";
import authRoute from "./routes/authRoute";
import passport from "./middlewares/passport";
import sessionRoute from "./routes/sessionRoute";
import { authenticateJWT } from "./strategies/jwt-strategy";

const BASE_PATH = config.BASE_PATH;
configDotenv();

const app = express();
//middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  })
);

//stratgey / passportjs
app.use(passport.initialize());

//connect to db
connectDB();

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPSSTATUS.OK).send({
      message: "Welcome! To the Squeezy platform.",
    });
  })
);

//auth routes
app.use(`${BASE_PATH}/auth`, authRoute);

//session-routes (passing this authenticateJwt is compulsory otherwise we get empty arrray)
app.use(`${config.BASE_PATH}/session`, authenticateJWT, sessionRoute);

//error handler middleware
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server is running on port${config.PORT}`);
});
