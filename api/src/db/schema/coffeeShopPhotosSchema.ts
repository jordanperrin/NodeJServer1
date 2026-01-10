import {
  integer,
  pgTable,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { coffeeShopsTable } from "./coffeeShopSchema";
import { usersTable } from "./usersSchema";

export const coffeeShopPhotos = pgTable("coffee_shop_photos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  coffee_shop_id: integer()
    .notNull()
    .references(() => coffeeShopsTable.id, { onDelete: "cascade" }),
  user_id: integer()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  url: varchar({ length: 500 }).notNull().unique(),

  created_at: timestamp().defaultNow().notNull(),
});
