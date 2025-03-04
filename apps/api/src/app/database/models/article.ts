import { sqliteTable, text, integer, numeric } from "drizzle-orm/sqlite-core";
import { contentTypes } from "./content-type";
import { channels } from "./channel";

export const articles = sqliteTable("articles", {
  slug: text().primaryKey(),
  contentTypeId: integer("content_type_id")
    .notNull()
    .references(() => contentTypes.id),
  channelId: integer("channel_id")
    .notNull()
    /**
     * The provided `channels` table does not have `id` column, but
     * in the DB there is still a relational mapping with the `id` column.
     *
     * Hence, disabling the following TS error
     *
     */
    // @ts-ignore
    .references(() => channels.id),
  title: text().notNull(),
  summary: text(),
  content: text(),
  publishedAt: numeric("published_at").notNull(),
});
