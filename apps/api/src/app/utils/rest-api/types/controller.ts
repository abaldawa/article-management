/**
 * @author Abhijit Baldawa
 */

import { StatusCodes } from "http-status-codes";

/**
 * The server will respond with below structure for
 * every **successful** REST api request
 */
interface ApiSuccessResponse<ResponsePayload> {
  data: ResponsePayload;
}

/**
 * The server will respond with below structure for
 * every **failed** REST api request
 */
interface ApiErrorResponse {
  error: {
    /**
     * Error code
     *
     * Ex: HTTP status code
     */
    code: number;

    /**
     * Error message highlighting the error
     */
    message: string;

    /**
     * Any optional details describing the error
     * in more details.
     *
     * Ex: ZOD error object
     */
    details?: unknown;
  };
}

/**
 * Success REST api controller response
 */
interface ControllerSuccessDataResponse<ResponseDataPayload>
  extends ApiSuccessResponse<ResponseDataPayload> {
  type: "success:json";
}

/**
 * Error REST api controller response
 */
interface ControllerErrorDataResponse extends ApiErrorResponse {
  type: "error:json";
}

/**
 * REST api controller return type
 */
interface ControllerReturnType<ResponseDataPayload> {
  statusCode: StatusCodes;
  response?:
    | ControllerSuccessDataResponse<ResponseDataPayload>
    | ControllerErrorDataResponse;
}

/**
 * REST Api controller function definition.
 */
type ControllerFunction<
  ResponseData = unknown,
  Body = unknown,
  User = unknown,
  Params = unknown,
  Query = unknown
> = (args: {
  body: Body;
  params: Params;
  query: Query;
  user: User;
}) =>
  | Promise<ControllerReturnType<ResponseData> | void>
  | ControllerReturnType<ResponseData>
  | void;

export {
  ApiSuccessResponse,
  ApiErrorResponse,
  ControllerFunction,
  ControllerReturnType,
};
