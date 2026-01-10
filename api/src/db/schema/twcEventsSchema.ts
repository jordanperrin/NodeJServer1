import {
  integer,
  pgTable,
  varchar,
  timestamp,
  date,
  unique
} from "drizzle-orm/pg-core";
import { coffeeShopsTable } from "./coffeeShopSchema";

export const twcEventsTable = pgTable("twc_events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).unique().notNull(),
  coffee_shop_id: integer()
    .references(() => coffeeShopsTable.id)
    .notNull(),
  event_date: date().notNull(),
  // users_attended
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
