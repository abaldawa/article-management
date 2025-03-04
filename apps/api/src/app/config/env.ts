/**
 * @author Abhijit Baldawa
 */

import "dotenv/config";
import { z } from "zod";
import { ValidationError } from "../utils/errors/error-types/validation-error";

const ApiServiceEnvVariablesSchema = z.object({
  NODE_ENV: z
    .enum(["production", "development"])
    .optional()
    .default("development"),
  PORT: z.coerce
    .number()
    .int()
    .positive()
    .min(1025)
    .max(65536)
    .optional()
    .default(3001),
});

type ApiServiceEnvVariables = z.infer<typeof ApiServiceEnvVariablesSchema>;

let apiServiceEnvVariables: ApiServiceEnvVariables | undefined;

const getEnvironmentVariables = (): ApiServiceEnvVariables => {
  if (apiServiceEnvVariables) {
    return apiServiceEnvVariables;
  }

  const validationResult = ApiServiceEnvVariablesSchema.safeParse(process.env);

  if (!validationResult.success) {
    throw new ValidationError(
      `Environment Variables validation failed`,
      validationResult.error.format()
    );
  }
  return validationResult.data;
};

export { getEnvironmentVariables };
