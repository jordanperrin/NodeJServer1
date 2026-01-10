import {
  integer,
  pgTable,
  varchar,
  point,
  decimal,
  unique,
  timestamp,
} from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { zipCodeTable } from "./zipCodeSchema";
import { twcEventsTable } from "./twcEventsSchema";

export const coffeeShopsTable = pgTable(
  "coffee_shops",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    google_id: varchar({ length: 315 }).unique(),
    name: varchar({ length: 255 }).notNull(),
    // rating: decimal({ precision: 3, scale: 1 }).default("0.0").notNull(),
    total_ratings: integer().default(0).notNull(),
    average_rating: decimal({ precision: 3, scale: 1 })
      .default("0.0")
      .notNull(),

    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull(),

    coordinates: point({ mode: "xy" }).notNull(),
    street_address: varchar({ length: 255 }).notNull(),
    zip_id: integer()
      .references(() => zipCodeTable.id, { onDelete: "restrict" })//prevents deletion of a parent record
      .notNull(),
  },
  (table) => ({
    unique_location: unique().on(
      table.coordinates,
      table.street_address,
      table.zip_id
    ),
  })
);

export const createShopSchema = createInsertSchema(coffeeShopsTable);

export const updateShopSchema = createInsertSchema(coffeeShopsTable).partial();
