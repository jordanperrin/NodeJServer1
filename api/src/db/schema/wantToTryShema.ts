import {
  integer,
  pgTable,
  varchar,
  point,
  decimal,
  unique,
  timestamp,
} from "drizzle-orm/pg-core";
import { usersTable } from "./usersSchema";
import { coffeeShopsTable } from "./coffeeShopSchema";

export const wantToTryTable = pgTable(
  "want_to_try",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer().references(() => usersTable.id),
    coffee_shop_id: integer().references(() => coffeeShopsTable.id),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => ({
    unique_entry: unique().on(table.user_id, table.coffee_shop_id),
  })
);
