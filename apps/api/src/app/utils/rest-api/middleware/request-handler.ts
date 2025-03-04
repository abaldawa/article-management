/**
 * @author Abhijit Baldawa
 */

import { RequestHandler } from "express";
import * as winston from "winston";
import { getErrorDetails } from "../../errors/error-handler";
import { ApiErrorResponse, ApiSuccessResponse, RouteConfig } from "../types";
import { logRequest } from "../request";
import {
  getSessionUserFromToken,
  SessionUser,
} from "../../../modules/auth/service";

/**
 * @public
 *
 * Central REST Api request handler for entire server.
 * This makes up for very interesting functionalities
 * such as:
 * 1] Central request handling
 * 2] Central error handling
 * 3] Request logging
 * 4] Time taken by each request and whether it was successful
 * 4] Detecting slow API's based on provided route configuration
 *
 * @param routeConfig
 * @param logger
 * @returns
 */
const requestHandler = (
  routeConfig: RouteConfig,
  logger: winston.Logger
): RequestHandler<
  { [param: string]: string },
  ApiSuccessResponse<unknown> | ApiErrorResponse | undefined
> => {
  const { controllers, maxAcceptableResponseTimeInMs, session } = routeConfig;

  return async (req, res) => {
    const requestStartTime = +new Date();
    const { body, params, query, method, url, headers } = req;

    try {
      let sessionUser: SessionUser["user"] | undefined;

      if (session && headers.authorization) {
        const jwtToken = headers.authorization.split("Bearer ")[1];

        if (jwtToken) {
          sessionUser = await getSessionUserFromToken(jwtToken);
        }
      }

      for (const controllerFunction of controllers) {
        const controllerResponse = await controllerFunction({
          body,
          params,
          query,
          user: sessionUser,
        });

        if (controllerResponse) {
          const { statusCode, response } = controllerResponse;

          if (response) {
            switch (response.type) {
              case "success:json": {
                const { data } = response;
                res.status(statusCode).send({ data });
                break;
              }

              case "error:json": {
                const { error } = response;
                res.status(statusCode).send({ error });
                break;
              }

              default:
                throw new Error(
                  `Controller function must have a valid response type`
                );
            }
          } else {
            res.status(statusCode).send();
          }

          const requestEndTime = +new Date();
          const requestTotalTimeTaken = requestEndTime - requestStartTime;

          logRequest(
            logger,
            method,
            url,
            statusCode,
            requestTotalTimeTaken,
            maxAcceptableResponseTimeInMs
          );
          return;
        }
      }

      /**
       * NOTE: This should never happen as the last controller should respond with a response
       */
      throw new Error(`Controller returned empty response`);
    } catch (error: unknown) {
      const { statusCode, errorMessage, details } = getErrorDetails(
        error,
        "Error processing request"
      );

      res.status(statusCode).send({
        error: {
          code: statusCode,
          message: errorMessage,
          details,
        },
      });

      const requestEndTime = +new Date();
      const requestTotalTimeTaken = requestEndTime - requestStartTime;

      logRequest(
        logger,
        method,
        url,
        statusCode,
        requestTotalTimeTaken,
        maxAcceptableResponseTimeInMs
      );
    }
  };
};

export { requestHandler };
