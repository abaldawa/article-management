/**
 * @author Abhijit Baldawa
 */

import { StatusCodes } from "http-status-codes";
import { ControllerFunction } from "../../utils/rest-api/types";
import { ValidationError } from "../../utils/errors/error-types/validation-error";
import * as service from "./service";
import { z } from "zod";
import { SessionUser } from "../auth/service";

const GetArticlesBodySchema = z
  .object({
    pagination: z
      .object({
        limit: z.number().int().positive(),
        offset: z.number().int().nonnegative(),
      })
      .strict(),
    analystSlug: z.string().optional(),
  })
  .strict();

const getArticles: ControllerFunction<
  Awaited<ReturnType<typeof service.getArticles>>,
  z.infer<typeof GetArticlesBodySchema>
> = async (args) => {
  const { body } = args;

  // 1. validate post body
  const validationResult = await GetArticlesBodySchema.safeParseAsync(body);

  if (!validationResult.success) {
    throw new ValidationError(
      "Invalid request body",
      validationResult.error.format()
    );
  }

  // 2. Search articles
  const articles = await service.getArticles({
    pagination: body.pagination,
    analystSlug: body.analystSlug,
  });

  return {
    statusCode: StatusCodes.OK,
    response: {
      type: "success:json",
      data: articles,
    },
  };
};

const getArticle: ControllerFunction<
  Awaited<ReturnType<typeof service.getArticle>>,
  undefined,
  SessionUser["user"] | undefined,
  { slug: string }
> = async (args) => {
  const { params, user } = args;

  const article = await service.getArticle({
    slug: params.slug,
    content: Boolean(user),
  });

  return {
    statusCode: StatusCodes.OK,
    response: {
      type: "success:json",
      data: article,
    },
  };
};

const getAllAnalysts: ControllerFunction<
  Awaited<ReturnType<typeof service.getAllAnalysts>>
> = async () => {
  const allAnalysts = await service.getAllAnalysts();

  return {
    statusCode: StatusCodes.OK,
    response: {
      type: "success:json",
      data: allAnalysts,
    },
  };
};

export { getArticles, getArticle, getAllAnalysts };
