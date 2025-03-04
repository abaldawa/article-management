/**
 * @author Abhijit Baldawa
 */

import axios from "axios";
import { ApiSuccessResponse } from "./types/server-response";
import { Analyst } from "./types/analyst";
import { Article } from "./types/article";

export interface ArticleItem
  extends Pick<Article, "slug" | "title" | "publishedAt"> {
  analysts: Analyst[];
}

export const getArticles = async (args: {
  pagination: {
    offset: number;
    limit: number;
  };
  analystSlug?: string;
}): Promise<ArticleItem[]> => {
  const response = await axios.post<ApiSuccessResponse<ArticleItem[]>>(
    `/api-service/articles/query`,
    args
  );

  return response.data.data;
};

export interface ArticleDetails
  extends Pick<
    Article,
    "publishedAt" | "slug" | "title" | "summary" | "content"
  > {
  analysts: Analyst[];
}

export const getArticleDetails = async ({
  articleSlug,
  accessToken,
}: {
  articleSlug: string;
  accessToken?: string;
}): Promise<ArticleDetails> => {
  const response = await axios.get<ApiSuccessResponse<ArticleDetails>>(
    `/api-service/articles/${articleSlug}`,
    {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : undefined,
    }
  );

  return response.data.data;
};

export const getAllAnalysts = async (): Promise<Analyst[]> => {
  const response = await axios.get<ApiSuccessResponse<Analyst[]>>(
    `/api-service/articles/analysts`
  );

  return response.data.data;
};
