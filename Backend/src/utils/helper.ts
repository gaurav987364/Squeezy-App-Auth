// helper function for getEnviourments

import { v4 as uuidv4 } from "uuid";
import { HTTPSSTATUS, HttpStatusCode } from "../config/http.config";
import { ErrorCode } from "./constants/constants";

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
