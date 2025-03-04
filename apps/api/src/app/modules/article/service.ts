import { eq, sql } from "drizzle-orm";
import { db } from "../../database/db";
import { analysts, articleAnalysts, articles } from "../../database/models";
import { NotfoundError } from "../../utils/errors/error-types/not-found-error";

const getArticles = async ({
  analystSlug,
  pagination,
}: {
  analystSlug?: string;
  pagination: { limit: number; offset: number };
}): Promise<
  {
    analysts: (typeof analysts.$inferSelect)[];
    slug: string;
    title: string;
    publishedAt: string;
  }[]
> => {
  const { limit, offset } = pagination;

  const allArticles = await db
    .select({
      slug: articles.slug,
      title: articles.title,
      publishedAt: articles.publishedAt,
      analysts: sql<string>`json_group_array(json_object('firstName', ${analysts.firstName}, 'lastName', ${analysts.lastName}, 'slug', ${analysts.slug}, 'picture', ${analysts.picture}))`,
    })
    .from(articles)
    .leftJoin(articleAnalysts, eq(articleAnalysts.articleSlug, articles.slug))
    .leftJoin(analysts, eq(articleAnalysts.analystSlug, analysts.slug))
    .where(
      analystSlug
        ? sql`${analystSlug} IN (SELECT ${articleAnalysts.analystSlug} FROM ${articleAnalysts} WHERE ${articleAnalysts.articleSlug} = ${articles.slug})`
        : undefined
    )
    .groupBy(articles.slug)
    .orderBy(sql`datetime(${articles.publishedAt}) DESC`)
    .limit(limit)
    .offset(offset);

  return allArticles.map((article) => ({
    ...article,
    analysts: JSON.parse(article.analysts) as (typeof analysts.$inferSelect)[],
  }));
};

const getArticle = async ({
  slug,
  content,
}: {
  slug: string;
  content?: boolean;
}): Promise<{
  publishedAt: string;
  analysts: (typeof analysts.$inferSelect)[];
  content?: string | null;
  slug: string;
  title: string;
  summary: string | null;
}> => {
  const [article] = await db
    .select({
      slug: articles.slug,
      title: articles.title,
      summary: articles.summary,
      ...(content ? { content: articles.content } : {}),
      publishedAt: articles.publishedAt,
      analysts: sql<string>`json_group_array(json_object('firstName', ${analysts.firstName}, 'lastName', ${analysts.lastName}, 'slug', ${analysts.slug}, 'picture', ${analysts.picture}))`,
    })
    .from(articles)
    .leftJoin(articleAnalysts, eq(articleAnalysts.articleSlug, articles.slug))
    .leftJoin(analysts, eq(articleAnalysts.analystSlug, analysts.slug))
    .where(eq(articles.slug, slug))
    .groupBy(articles.slug);

  if (!article) {
    throw new NotfoundError("Article not found");
  }

  return {
    ...article,
    analysts: JSON.parse(article.analysts) as (typeof analysts.$inferSelect)[],
  };
};

const getAllAnalysts = async (): Promise<(typeof analysts.$inferSelect)[]> => {
  const allAnalysts = await db.select().from(analysts);
  return allAnalysts;
};

export { getArticles, getArticle, getAllAnalysts };
