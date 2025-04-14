import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from "passport-jwt";
import { UnAuthorizedexception } from "../utils/Error/ErrorTypes";
import { ErrorCode } from "../utils/constants/constants";
import { config } from "../config/app.config";
import passport, { PassportStatic } from "passport";
import { UserService } from "../modules/user/user.service";

interface JwtPayload {
  userId: string;
  sessionId: string;
}

const options: StrategyOptionsWithRequest = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        throw new UnAuthorizedexception(
          "Unauthorized access token.",
          ErrorCode.AUTH_TOKEN_NOT_FOUND
        );
      }
      return accessToken;
    },
  ]),
  secretOrKey: config.JWT.SECRET,
  audience: ["user"],
  algorithms: ["HS256"],
  passReqToCallback: true,
};

export const setupJwtStrategy = (passport: PassportStatic) => {
  passport.use(
    new Strategy(options, async (req, payload: JwtPayload, done) => {
      try {
        const user = await UserService(payload.userId);

        if (!user) {
          return done(null, false);
        }

        req.sessionId = payload.sessionId;
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

export const authenticateJWT = passport.authenticate("jwt", { session: false });
