import { z } from "zod";
import { createShopSchema } from "../../db/schema/coffeeShopSchema";

export type CoffeeShopInsert = z.infer<typeof createShopSchema>;