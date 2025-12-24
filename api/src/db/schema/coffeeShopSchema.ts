import { integer, pgTable, varchar, point, decimal } from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';

export const coffeeShopsTable = pgTable("coffee_shops", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  // coordinates: point({ mode: 'xy' }).notNull(),
  rating: decimal({precision: 3, scale:1}).default("0.0").notNull(),
  total_ratings: integer().default(0).notNull(),
  average_rating: decimal({precision:3, scale:1}).default("0.0").notNull(),
});

export const createShopSchema = createInsertSchema(coffeeShopsTable).strict();