import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const channels = sqliteTable("channels", {
  slug: text().notNull(),
  badge: text(),
  name: text(),
});
