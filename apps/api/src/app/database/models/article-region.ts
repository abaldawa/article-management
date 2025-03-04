import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { articles } from "./article";
import { regions } from "./region";

export const articleRegions = sqliteTable(
  "article_regions",
  {
    articleSlug: text("article_slug").references(() => articles.slug),
    regionId: integer("region_id").references(() => regions.id),
  },
  (table) => [
    primaryKey({
      columns: [table.articleSlug, table.regionId],
      name: "article_regions_article_slug_region_id_pk",
    }),
  ]
);
