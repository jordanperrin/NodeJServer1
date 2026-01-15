import { Request, Response, NextFunction } from "express";
import { db } from "../../db/index";
import { coffeeShopsTable } from "../../db/schema/coffeeShopSchema";
import { eq } from "drizzle-orm";
import { type CoffeeShopInsert } from "../../types/zod/coffeeShopTableZod";
import { createShopSchema } from "../../db/schema/coffeeShopSchema";

export async function listShops(req: Request, res: Response, next: NextFunction) {
  try {
    const coffee_shops = await db.select().from(coffeeShopsTable);
    res.status(200).json(coffee_shops);
  } catch (e) {
    next(e);
  }
}

export async function getShopById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const [coffee_shop] = await db
      .select()
      .from(coffeeShopsTable)
      .where(eq(coffeeShopsTable.id, id));

    if (!coffee_shop) {
      const error: any = new Error("coffee shop not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(coffee_shop);
  } catch (e) {
    next(e);
  }
}

export async function createShop(req: Request, res: Response, next: NextFunction) {
  try {
    const [coffeeShop] = await db
      .insert(coffeeShopsTable)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(coffeeShop);
  } catch (e) {
    next(e);
  }
}

export async function updateShop(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;

    const [updatedShop] = await db
      .update(coffeeShopsTable)
      .set(updatedFields)
      .where(eq(coffeeShopsTable.id, id))
      .returning();

    if (!updatedShop) {
      const error: any = new Error("Shop not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(updatedShop);
  } catch (e) {
    next(e);
  }
}

export async function deleteShop(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const [deletedShop] = await db
      .delete(coffeeShopsTable)
      .where(eq(coffeeShopsTable.id, id))
      .returning();

    if (!deletedShop) {
      const error: any = new Error("Shop not found");
      error.status = 404;
      return next(error);
    }

    res.status(204).send();
  } catch (e) {
    next(e);
  }
}
