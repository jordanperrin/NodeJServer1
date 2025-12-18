import { Request, Response } from "express";
import { db } from "../../db/index";
import { coffeeShopsTable } from "../../db/schema/coffeeShopSchema";
import { eq } from "drizzle-orm";

export async function listShops(req: Request, res: Response) {
  try {
    const coffee_shops = await db.select().from(coffeeShopsTable);

    res.status(200).json(coffee_shops);
  } catch (e) {
    res.status(500).send(e);
  }
  res.send("listShops");
}

export async function getShopById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const [coffee_shop] = await db
      .select()
      .from(coffeeShopsTable)
      .where(eq(coffeeShopsTable.id, Number(id)));

    if (!coffee_shop) {
      res.status(404).send({ message: "coffee shop not found" });
    } else {
      res.status(200).json(coffee_shop);
    }
  } catch (e) {
    res.status(500).send(e);
  }
  res.send("getShopById");
}

export async function createShop(req: Request, res: Response) {
  try {
    const [coffeeShop] = await db
      .insert(coffeeShopsTable)
      .values(req.body)
      .returning();

    res.status(201).json(coffeeShop);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function updateShop(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.body;

    const [updatedShop] = await db
      .update(coffeeShopsTable)
      .set(updatedFields)
      .where(eq(coffeeShopsTable.id, id))
      .returning();

    if(updatedShop){
        res.status(200).json(updatedShop);
    }else{
        res.status(404).send({message: 'Shop not found'})
    }
  } catch (e) {
    res.status(500).send(e);
  }
  res.send("updateShop");
}

export async function deleteShop(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const [deletedShop] = await db
      .delete(coffeeShopsTable)
      .where(eq(coffeeShopsTable.id, id))
      .returning();

    if (deletedShop) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: "Shop not found" });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
