import { getEnviourments } from "../utils/helper";

const appConfig = () => ({
  NODE_ENV: getEnviourments("NODE_ENV", "development"),
  PORT: getEnviourments("PORT", "5000"),
  APP_ORIGIN: getEnviourments("APP_ORIGIN", "http://localhost:5173"),
  BASE_PATH: getEnviourments("BASE_PATH", "/api"),
  JWT: {
    SECRET: getEnviourments("JWT_SECRET", "my_jwt_secret"),
    EXPIRES_IN: getEnviourments("JWT_EXPIRES_IN", "1m"),
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
  RESEND_API_KEY: getEnviourments(
    "RESEND_API_KEY",
    "re_VnZCdzL4_LVEwQZDK8XwUQanR2qyzeVBa"
  ),
  MAILER_SENDER: getEnviourments("MAILER_SENDER", "onboarding@gmail.com"),
});

export const config = appConfig();
// re_VnZCdzL4_LVEwQZDK8XwUQanR2qyzeVBa
