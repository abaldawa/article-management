/**
 * @author Abhijit Baldawa
 */

import { StatusCodes } from "http-status-codes";
import * as winston from "winston";

/**
 * @private
 *
 * Given ex. 400 returns '4.x.x'
 *
 * @param statusCode
 */
const convertStatusCodeToStr = (statusCode: StatusCodes): `${number}.x.x` => {
  const statusCodeStr = `${statusCode}`;
  return [
    statusCodeStr[0],
    ...statusCodeStr
      .slice(1)
      .split("")
      .map(() => "x"),
  ].join(".") as `${number}.x.x`;
};

/**
 * @public
 *
 * Logs the request with appropriate loglevel based on statusCode
 *
 * @param logger
 * @param method
 * @param PATH_URL
 * @param statusCode
 * @param responseTimeInMs
 * @param maxAcceptableResponseTimeInMs
 * @param customMessage
 */
const logRequest = (
  logger: winston.Logger,
  method: string,
  PATH_URL: string,
  statusCode: StatusCodes,
  responseTimeInMs: number,
  maxAcceptableResponseTimeInMs: number,
  customMessage?: string
) => {
  const responseTimeExceeded = responseTimeInMs > maxAcceptableResponseTimeInMs;
  const statusCodePattern = convertStatusCodeToStr(statusCode);
  let logLevel: "warn" | "info" | "error";

  switch (statusCodePattern) {
    case "5.x.x":
      logLevel = "error";
      break;
    case "4.x.x":
      logLevel = "warn";
      break;
    case "2.x.x":
    default:
      logLevel = "info";
  }

  if (responseTimeExceeded && logLevel === "info") {
    logLevel = "warn";
  }

  logger[logLevel](
    `(${statusCode}) ${method} ${PATH_URL} ${responseTimeInMs}ms (maxAcceptableResponseTimeInMs = ${maxAcceptableResponseTimeInMs}ms)${
      responseTimeExceeded ? ` (response time exceeded)` : ""
    }${customMessage ? ` (${customMessage})` : ""}`
  );
};

export { logRequest };
