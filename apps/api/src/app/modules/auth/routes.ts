/**
 * @author Abhijit Baldawa
 */

import { ControllerFunction, RouteConfig } from "../../utils/rest-api/types";
import * as controller from "./controller";

const MODULE_PATH = "/auth";

const authModuleRoutes: RouteConfig[] = [
  {
    method: "post",
    path: `${MODULE_PATH}/login`,
    maxAcceptableResponseTimeInMs: 100,
    controllers: [controller.login as ControllerFunction],
  },
];

export { authModuleRoutes };
