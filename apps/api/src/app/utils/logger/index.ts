/**
 * @author Abhijit Baldawa
 *
 * Standard logger module using winston
 */

import { createLogger, format, transports } from "winston";

type TransformableInfo = Parameters<Parameters<typeof format.printf>[0]>[0];
interface ConsoleLogTransformableInfo extends TransformableInfo {
  service?: string;
  stack?: string;
  timestamp?: string;
}

type Transports = NonNullable<Parameters<typeof createLogger>[0]>["transports"];
interface LoggerOptions {
  logLevel: "debug" | "info" | "warn" | "error";
  serviceName: string;
  productionMode: boolean;
  transports?: Transports;
}

const createServiceLogger = (options: LoggerOptions) => {
  const {
    logLevel,
    serviceName,
    transports: transportOption,
    productionMode,
  } = options;

  const logger = createLogger({
    level: logLevel,
    format: format.combine(
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.errors({ stack: false }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: serviceName },
    transports: transportOption,
  });

  if (!productionMode) {
    logger.add(
      new transports.Console({
        level: logLevel,
        format: format.combine(
          format.printf((logObj: ConsoleLogTransformableInfo) => {
            const {
              level,
              message,
              timestamp,
              stack,
              service,
              ...additionalLog
            } = logObj;

            return `(${timestamp}) ${service}: (${level}) ${message}${
              Object.keys(additionalLog).length
                ? `, additionalLogs = ${JSON.stringify(additionalLog, null, 2)}`
                : ""
            }${stack ? `, stack = ${stack}` : ""}`;
          }),
          format.colorize({ all: true })
        ),
      })
    );
  }

  return logger;
};

export { createServiceLogger };
