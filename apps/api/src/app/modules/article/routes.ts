/**
 * @author Abhijit Baldawa
 */

import { ControllerFunction, RouteConfig } from "../../utils/rest-api/types";
import * as controller from "./controller";

const MODULE_PATH = "/articles";

const articleModuleRoutes: RouteConfig[] = [
  {
    method: "post",
    path: `${MODULE_PATH}/query`,
    maxAcceptableResponseTimeInMs: 100,
    controllers: [controller.getArticles as ControllerFunction],
  },
  {
    method: "get",
    path: `${MODULE_PATH}/analysts`,
    maxAcceptableResponseTimeInMs: 100,
    controllers: [controller.getAllAnalysts],
  },
  {
    method: "get",
    path: `${MODULE_PATH}/:slug`,
    maxAcceptableResponseTimeInMs: 100,
    session: true,
    controllers: [controller.getArticle as ControllerFunction],
  },
];

export { articleModuleRoutes };
