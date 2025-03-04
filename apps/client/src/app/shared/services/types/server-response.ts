/**
 * @author Abhijit Baldawa
 */

/**
 * The server will respond with below structure for
 * every **successful** REST api request
 */
export interface ApiSuccessResponse<ResponsePayload> {
  data: ResponsePayload;
}

/**
 * The server will respond with below structure for
 * every **failed** REST api request
 */
export interface ApiErrorResponse {
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
