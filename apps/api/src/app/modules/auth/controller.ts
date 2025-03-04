/**
 * @author Abhijit Baldawa
 */

import { StatusCodes } from "http-status-codes";
import { ControllerFunction } from "../../utils/rest-api/types";
import { ValidationError } from "../../utils/errors/error-types/validation-error";
import * as service from "./service";
import { z } from "zod";

const LoginBodySchema = z
  .object({
    analystSlug: z.string().min(1),
    password: z.string().min(1),
  })
  .strict();

const login: ControllerFunction<
  Awaited<ReturnType<typeof service.login>>,
  z.infer<typeof LoginBodySchema>
> = async (args) => {
  const { body } = args;

  // 1. validate post body
  const validationResult = await LoginBodySchema.safeParseAsync(body);

  if (!validationResult.success) {
    throw new ValidationError(
      "Invalid request body",
      validationResult.error.format()
    );
  }

  // 2. Login user and generate a session token
  const userSessionDetails = await service.login(body.analystSlug);

  return {
    statusCode: StatusCodes.OK,
    response: {
      type: "success:json",
      data: userSessionDetails,
    },
  };
};

export { login };
