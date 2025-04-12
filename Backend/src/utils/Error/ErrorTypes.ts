import { HTTPSSTATUS, HttpStatusCode } from "../../config/http.config";
import { ErrorCode } from "../constants/constants";
import { AppError } from "../helper";

// Not found
export class NotFoundExeption extends AppError {
  constructor(message = "Resources Not Found", errorcode?: ErrorCode) {
    super(
      message,
      HTTPSSTATUS.NOT_FOUND,
      errorcode || ErrorCode.RESOURCE_NOT_FOUND
    );
  }
}
// bad request
export class BadRequestException extends AppError {
  constructor(message = "Bad Request", errorCode?: ErrorCode) {
    super(message, HTTPSSTATUS.BAD_REQUEST, errorCode);
  }
}
// unauthorized
export class UnAuthorizedexception extends AppError {
  constructor(message = "Unauthorized Access", errorCode?: ErrorCode) {
    super(
      message,
      HTTPSSTATUS.UNAUTHORIZED,
      errorCode || ErrorCode.ACCESS_UNAUTHORIZED
    );
  }
}
// internal server
export class InternalServerException extends AppError {
  constructor(message = "Internal Server Error.", errorCode?: ErrorCode) {
    super(
      message,
      HTTPSSTATUS.INTERNAL_SERVER_ERROR,
      errorCode || ErrorCode.INTERNAL_SERVER_ERROR
    );
  }
}

// https => this exception is different from above ones; we have to pass status code also to contructor
export class Httpsexception extends AppError {
  constructor(
    message = "HTTP Server Error.",
    statusCode: HttpStatusCode,
    errorCode?: ErrorCode
  ) {
    super(message, statusCode, errorCode);
  }
}
