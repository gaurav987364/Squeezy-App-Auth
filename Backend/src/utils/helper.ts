import { add } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { HTTPSSTATUS, HttpStatusCode } from "../config/http.config";
import { ErrorCode } from "./constants/constants";

// helper function for getEnviourments
export const getEnviourments = (key: string, defaultValue: string) => {
  const value = process.env[key];

  if (value === undefined) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`Enviourmens variable ${key} does not exists.`);
  }
  return value;
};

export class AppError extends Error {
  public statusCode: HttpStatusCode;
  public errorCode: ErrorCode;
  constructor(
    message: string,
    statusCode = HTTPSSTATUS.INTERNAL_SERVER_ERROR,
    errorCode: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

//unique codes for verification
export const generateUniqueCodes = () => {
  return uuidv4().replace(/-/g, "").substring(0, 25);
};

// after fortyfive minutes
export const AfterFortyFiveMinutes = (): Date => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 45);
  return now;
};

// thirty days from now
export const ThirtyDaysFromNow = (): Date => {
  const now = new Date();
  now.setDate(now.getDate() + 30);
  return now;
};

// three minute ago
export const threeMinutesAgo = (): Date => new Date(Date.now() - 3 * 60 * 1000);

// ten minutes ago
export const tenMinutesAgo = (): Date => new Date(Date.now() - 10 * 60 * 1000);

// after 1 hour
export const afterOneHour = (): Date => new Date(Date.now() + 60 * 60 * 1000);

// cookie expire calculation function
export const calculateExpirationDate = (expires: string = "15m"): Date => {
  // match number + unit (m = minutes, h=hours, d=days)
  const match = expires.match(/^(\d+)([mhd])$/);

  if (!match) throw new Error("Invalid format.Use '15m', '1h', or '2d'");

  const [, value, unit] = match; //value 15 + unit m
  const expirationDate = new Date();

  // Check the unit and apply accordingly
  switch (unit) {
    case "m": // minutes
      return add(expirationDate, { minutes: parseInt(value) });
    case "h": // hours
      return add(expirationDate, { hours: parseInt(value) });
    case "d": // days
      return add(expirationDate, { days: parseInt(value) });
    default:
      throw new Error('Invalid unit. Use "m", "h", or "d".');
  }
};
