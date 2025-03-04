import { sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core";
import { articles } from "./article";
import { analysts } from "./analyst";

export const articleAnalysts = sqliteTable(
  "article_analysts",
  {
    articleSlug: text("article_slug").references(() => articles.slug),
    analystSlug: text("analyst_slug").references(() => analysts.slug),
  },
  (table) => [
    primaryKey({
      columns: [table.articleSlug, table.analystSlug],
      name: "article_analysts_article_slug_analyst_slug_pk",
    }),
  ]
);
