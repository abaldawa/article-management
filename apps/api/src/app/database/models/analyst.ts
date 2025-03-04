import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const analysts = sqliteTable("analysts", {
  slug: text().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  picture: text(),
});
