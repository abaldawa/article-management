/**
 * @author Abhijit Baldawa
 */

import { Router } from "express";
import { logger } from "../logger";
import { articleModuleRoutes } from "../modules/article/routes";
import { requestHandler } from "../utils/rest-api/middleware";
import { authModuleRoutes } from "../modules/auth/routes";

const SERVICE_NAME = "api-service";

/**
 * @public
 *
 * Adds all the routes of all the modules and responds with a root router
 */
const getRootRouter = () => {
  const rootRouter = Router();
  const routes = [...articleModuleRoutes, ...authModuleRoutes];

  routes.forEach((route) => {
    rootRouter[route.method](
      `/${SERVICE_NAME}${route.path}`,
      requestHandler(route, logger)
    );
  });

  return rootRouter;
};

export { getRootRouter };
