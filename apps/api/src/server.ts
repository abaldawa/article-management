/**
 * @author Abhijit Baldawa
 */

import express from "express";
import { join } from "path";
import { getRootRouter } from "./app/rest-api/routes";
import { logger } from "./app/logger";
import { getEnvironmentVariables } from "./app/config/env";
import { getErrorDetails } from "./app/utils/errors/error-handler";

const start = async () => {
  try {
    const { PORT } = getEnvironmentVariables();
    const app = express();

    // 1. Add middlewares
    app.use(express.json());
    app.use(getRootRouter());

    // 2. Serve static resources from the "public" folder (ex: when there are images to display)
    app.use(express.static(join(__dirname, "../../client/dist")));

    // 3. Serve the HTML page for any unknown route
    app.get("*", (_, res) => {
      res.sendFile(join(__dirname, "../../client/dist", "index.html"));
    });

    // 4. Start HTTP server
    await new Promise<void>((resolve, reject) => {
      app.listen(PORT, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    logger.info(`Server is listening on port ${PORT}`);
  } catch (error: unknown) {
    const { errorMessage, details } = getErrorDetails(error, "Error occurred");

    logger.error(
      `Error while starting server. Reason: ${errorMessage}. Exiting...`,
      details
    );

    process.exit(1);
  }
};

if (require.main === module) {
  start();
}

export { start };
