import passport from "passport";
import { setupJwtStrategy } from "../strategies/jwt-strategy";

const initializePassport = () => {
  setupJwtStrategy(passport);
};

initializePassport();
export default passport;
