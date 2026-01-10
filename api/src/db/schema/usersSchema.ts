import {
  integer,
  pgTable,
  unique,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  password_hash: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }).notNull().unique(),

  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull(),
});
