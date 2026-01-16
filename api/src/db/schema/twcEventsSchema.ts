import {
  integer,
  pgTable,
  varchar,
  timestamp,
  date,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { coffeeShopsTable } from "./coffeeShopSchema";

export const twcEventsTable = pgTable("twc_events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).unique().notNull(),
  coffee_shop_id: integer()
    .notNull()
    .references(() => coffeeShopsTable.id, { onDelete: "restrict" }),
  event_date: date().notNull(),
  // users_attended
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull()
});

export const createTwcEventSchema = createInsertSchema(twcEventsTable);
export const updateTwcEventSchema = createInsertSchema(twcEventsTable).partial();
