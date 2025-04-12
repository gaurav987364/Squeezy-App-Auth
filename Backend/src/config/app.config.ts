import { getEnviourments } from "../utils/helper";

const appConfig = () => ({
  NODE_ENV: getEnviourments("NODE_ENV", "developement"),
  PORT: getEnviourments("PORT", "5000"),
  APP_ORIGIN: getEnviourments("APP_ORIGIN", "https://localhost:5173"),
  BASE_PATH: getEnviourments("BASE_PATH", "/api"),
  JWT: {
    SECRET: getEnviourments("JWT_SECRET", "my_jwt_secret"),
    EXPIRES_IN: getEnviourments("JWT_EXPIRES_IN", "15m"),
    REFRESH_SECRET: getEnviourments(
      "JWT_REFRESH_SECRET",
      "my_jwt_refresh_secret"
    ),
    REFRESH_EXPIRES_IN: getEnviourments("JWT_REFRESH_EXPIRES_IN", "30d"),
  },
  MONGO_URI: getEnviourments(
    "MONGO_URI",
    "mongodb://localhost:27017/squeezy_app"
  ),
});

export const config = appConfig();
