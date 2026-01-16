import {
  integer,
  decimal,
  pgTable,
  unique,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { coffeeShopsTable } from "./coffeeShopSchema";
import { userTable } from "./usersSchema";

export const ratingsTable = pgTable(
  "ratings",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer()
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    coffee_shop_id: integer()
      .notNull()
      .references(() => coffeeShopsTable.id, { onDelete: "cascade" }),
    score: decimal({ precision: 3, scale: 1 }).notNull(),

    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp().defaultNow().notNull()
  },
  (table) => ({
    uniqueUserShop: unique().on(table.user_id, table.coffee_shop_id),
  })
);

export const createRatingSchema = createInsertSchema(ratingsTable);
export const updateRatingSchema = createInsertSchema(ratingsTable).partial();
