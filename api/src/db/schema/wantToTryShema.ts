import {
  integer,
  pgTable,
  unique,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { userTable } from "./usersSchema";
import { coffeeShopsTable } from "./coffeeShopSchema";

export const wantToTryTable = pgTable(
  "want_to_try",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer()
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    coffee_shop_id: integer()
      .notNull()
      .references(() => coffeeShopsTable.id, { onDelete: "cascade" }),
    created_at: timestamp().defaultNow().notNull(),
  },
  (table) => ({
    unique_entry: unique().on(table.user_id, table.coffee_shop_id),
  })
);

export const createWantToTrySchema = createInsertSchema(wantToTryTable);
