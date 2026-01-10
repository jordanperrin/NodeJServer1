import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

export const zipCodeTable = pgTable("zip_codes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  zip: varchar({ length: 10 }).unique().notNull(),
  city: varchar({ length: 100 }).notNull(),
  state: varchar({ length: 2 }).notNull(),
});
