import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const regions = sqliteTable("regions", {
  id: integer().primaryKey(),
  slug: text().notNull(),
  name: text().notNull(),
});
