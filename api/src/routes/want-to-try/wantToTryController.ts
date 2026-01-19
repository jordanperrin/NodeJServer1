import { Request, Response, NextFunction } from "express";
import { db } from "../../db/index";
import { wantToTryTable } from "../../db/schema/wantToTryShema";
import { eq, and } from "drizzle-orm";

// GET /user/:userId/want-to-try - Get all shops a user wants to try
export async function getWantToTryByUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = Number(req.params.userId);
    const entries = await db
      .select()
      .from(wantToTryTable)
      .where(eq(wantToTryTable.user_id, userId));
    res.status(200).json(entries);
  } catch (e) {
    next(e);
  }
}

// GET /coffee-shop/:shopId/want-to-try - Get all users who want to try this shop
export async function getWantToTryByShop(req: Request, res: Response, next: NextFunction) {
  try {
    const shopId = Number(req.params.shopId);
    const entries = await db
      .select()
      .from(wantToTryTable)
      .where(eq(wantToTryTable.coffee_shop_id, shopId));
    res.status(200).json(entries);
  } catch (e) {
    next(e);
  }
}

// POST /user/:userId/want-to-try - Add a shop to user's want-to-try list
export async function addToWantToTry(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = Number(req.params.userId);
    const [entry] = await db
      .insert(wantToTryTable)
      .values({ ...req.cleanBody, user_id: userId })
      .returning();
    res.status(201).json(entry);
  } catch (e) {
    next(e);
  }
}

// DELETE /user/:userId/want-to-try/:shopId - Remove a shop from user's list
export async function removeFromWantToTry(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = Number(req.params.userId);
    const shopId = Number(req.params.shopId);

    const [existing] = await db
      .select()
      .from(wantToTryTable)
      .where(and(eq(wantToTryTable.user_id, userId), eq(wantToTryTable.coffee_shop_id, shopId)));

    if (!existing) {
      const error: any = new Error("Entry not found");
      error.status = 404;
      return next(error);
    }

    await db
      .delete(wantToTryTable)
      .where(and(eq(wantToTryTable.user_id, userId), eq(wantToTryTable.coffee_shop_id, shopId)));

    res.status(204).send();
  } catch (e) {
    next(e);
  }
}