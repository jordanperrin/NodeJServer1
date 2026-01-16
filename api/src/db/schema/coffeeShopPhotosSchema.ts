import {
  integer,
  pgTable,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { coffeeShopsTable } from "./coffeeShopSchema";
import { userTable } from "./usersSchema";

export const coffeeShopPhotosTable = pgTable("coffee_shop_photos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  coffee_shop_id: integer()
    .notNull()
    .references(() => coffeeShopsTable.id, { onDelete: "cascade" }),
  user_id: integer()
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  url: varchar({ length: 500 }).notNull().unique(),

  created_at: timestamp().defaultNow().notNull(),
});

export const createPhotoSchema = createInsertSchema(coffeeShopPhotosTable);
