import {
  integer,
  decimal,
  pgTable,
  unique,
  timestamp,
} from "drizzle-orm/pg-core";
import { coffeeShopsTable } from "./coffeeShopSchema";
import { usersTable } from "./usersSchema";

export const ratingsTable = pgTable(
  "ratings",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer()
      .notNull()
      .references(() => usersTable.id),
    coffee_shop_id: integer()
      .notNull()
      .references(() => coffeeShopsTable.id),
    score: decimal({ precision: 3, scale: 1 }).notNull(),

    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull(),
  },
  (table) => ({
    uniqueUserShop: unique().on(table.user_id, table.coffee_shop_id),
  })
);
