import {
  integer,
  pgTable,
  varchar,
  timestamp,
  text
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { coffeeShopsTable } from "./coffeeShopSchema";
import { userTable } from "./usersSchema";

export const coffeeShopCommentsTable = pgTable("coffee_shop_comments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  coffee_shop_id: integer()
    .notNull()
    .references(() => coffeeShopsTable.id, { onDelete: "cascade" }),
  user_id: integer()
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  url_photo: varchar({ length: 500 }),
  content: text("content").notNull(),

  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull()
});

export const createCommentSchema = createInsertSchema(coffeeShopCommentsTable);
export const updateCommentSchema = createInsertSchema(coffeeShopCommentsTable).partial();
