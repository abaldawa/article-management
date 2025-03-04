import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contentTypes = sqliteTable("content_types", {
  id: integer().primaryKey(),
  name: text().notNull(),
  color: text().notNull(),
  assetClassId: integer("asset_class_id"),
});
