/**
 * @author Abhijit Baldawa
 */

import { ControllerFunction } from "./controller";

/**
 * Route configuration for each REST api route
 */
interface RouteConfig {
  /**
   * Supported HTTP method by the route
   */
  method: "get" | "put" | "post" | "delete" | "patch";

  /**
   * Path of http route
   */
  path: string;

  /**
   * Function Handler's of this route. Can also add
   * middlewares here.
   *
   * **NOTE:** Atleast one controller function must
   * respond with error/success
   */
  controllers: ControllerFunction[];

  /**
   * The maximum time beyond which a request is marked
   * as slow API and is logged as a warn log highlighting
   * that the request exceeded the time max acceptable
   * response time.
   *
   * Use this to benchmark API's and detect slow api's.
   *
   * **NOTE**: This flag is purely for detecting and logging
   * slow REST API's. It DOES NOT cancel the request if it
   * takes longer than the configured acceptable time.
   */
  maxAcceptableResponseTimeInMs: number;

  /**
   * If set to true then the route is a session route
   *
   * A `user` object is attached to the request object
   * which contains the user information.
   */
  session?: boolean;
}

export { RouteConfig };
