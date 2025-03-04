/**
 * @author Abhijit Baldawa
 */

import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { ValidationError } from "./error-types/validation-error";
import { NotfoundError } from "./error-types/not-found-error";

type KnownError = ValidationError | NotfoundError | z.ZodError;

/**
 * @public
 *
 * Central error handler for REST api calls which inspects
 * error and returns appropriate status code and error message
 *
 * @param error
 * @param errMsgIfNoMatch
 */
const getErrorDetails = (error: unknown, errMsgIfNoMatch: string) => {
  let statusCode: StatusCodes;
  let errorMessage: string;
  let details: unknown;

  if (error instanceof z.ZodError) {
    [statusCode, errorMessage, details] = [
      StatusCodes.BAD_REQUEST,
      "Validation error",
      error.format(),
    ];
  } else if (error instanceof NotfoundError) {
    [statusCode, errorMessage, details] = [
      StatusCodes.NOT_FOUND,
      error.message,
      error.details,
    ];
  } else if (error instanceof ValidationError) {
    [statusCode, errorMessage, details] = [
      StatusCodes.BAD_REQUEST,
      error.message,
      error.details,
    ];
  } else if (error instanceof Error) {
    [statusCode, errorMessage] = [
      StatusCodes.INTERNAL_SERVER_ERROR,
      `${errMsgIfNoMatch}. Reason -> ${error.message}`,
    ];
  } else {
    [statusCode, errorMessage] = [
      StatusCodes.INTERNAL_SERVER_ERROR,
      `${errMsgIfNoMatch}. Reason -> ${error}`,
    ];
  }

  return { statusCode, errorMessage, details };
};

const isKnownError = (error: unknown): error is KnownError =>
  error instanceof z.ZodError ||
  error instanceof NotfoundError ||
  error instanceof ValidationError;

export { KnownError, getErrorDetails, isKnownError };
