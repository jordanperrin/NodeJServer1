import {
  integer,
  pgTable,
  varchar,
  unique,
  timestamp,
  text
} from "drizzle-orm/pg-core";
import { coffeeShopsTable } from "./coffeeShopSchema";
import { usersTable } from "./usersSchema";

export const coffeeShopComments = pgTable("coffee_shop_comments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  coffee_shop_id: integer()
    .notNull()
    .references(() => coffeeShopsTable.id, { onDelete: "cascade" }),
  user_id: integer()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  url_photo: varchar({ length: 500 }).notNull().unique(),
  content: text("content").notNull(),

  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().notNull(),
});
