import {
  integer,
  pgTable,
  unique,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

export const userTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  password_hash: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }).notNull().unique(),

  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull()
});

export const createUserSchema = createInsertSchema(userTable);

export const updateUserSchema = createInsertSchema(userTable).partial();
