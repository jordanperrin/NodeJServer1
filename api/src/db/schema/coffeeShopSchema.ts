import { integer, pgTable, varchar, point, decimal } from "drizzle-orm/pg-core";

export const coffeeShopsTable = pgTable("coffee_shops", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  cordinates: point({ mode: 'xy' }).notNull(),
  rating: decimal({precision: 4, scale:1}),
});
