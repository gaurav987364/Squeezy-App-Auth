import { ErrorRequestHandler } from "express";
import { AppError } from "../utils/helper";
import { HTTPSSTATUS } from "../config/http.config";

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): any => {
  console.error(`Error Occured On Path : ${req.path}`, error);

  if (error instanceof SyntaxError) {
    return res.status(HTTPSSTATUS.BAD_REQUEST).json({
      message: "Invalid, Json Syntax.",
      error: error?.message || "Unknown Error Occured.",
    });
  }

  //zod errors

  //app error class
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  return res.status(HTTPSSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error?.message || "Unknown Error Occured.",
  });
};
