import { Request, Response, NextFunction } from "express";
import { db } from "../../db/index";
import { ratingsTable } from "../../db/schema/ratingsSchema";
import { eq } from "drizzle-orm";

// GET /user/:userId/rating - Get all ratings by a user
export async function getRatingsByUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = Number(req.params.userId);
    const ratings = await db
      .select()
      .from(ratingsTable)
      .where(eq(ratingsTable.user_id, userId));
    res.status(200).json(ratings);
  } catch (e) {
    next(e);
  }
}

// GET /coffee-shop/:shopId/rating - Get all ratings for a shop
export async function getRatingsByShop(req: Request, res: Response, next: NextFunction) {
  try {
    const shopId = Number(req.params.shopId);
    const ratings = await db
      .select()
      .from(ratingsTable)
      .where(eq(ratingsTable.coffee_shop_id, shopId));
    res.status(200).json(ratings);
  } catch (e) {
    next(e);
  }
}

// GET /coffee-shop/:shopId/rating/:ratingId - Get a specific rating
export async function getRatingById(req: Request, res: Response, next: NextFunction) {
  try {
    const shopId = Number(req.params.shopId);
    const ratingId = Number(req.params.ratingId);
    const [rating] = await db
      .select()
      .from(ratingsTable)
      .where(eq(ratingsTable.id, ratingId));

    if (!rating || rating.coffee_shop_id !== shopId) {
      const error: any = new Error("Rating not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(rating);
  } catch (e) {
    next(e);
  }
}

// POST /user/:userId/rating - Create a rating (user rates a shop)
export async function createRating(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = Number(req.params.userId);
    const [rating] = await db
      .insert(ratingsTable)
      .values({ ...req.cleanBody, user_id: userId })
      .returning();
    res.status(201).json(rating);
  } catch (e) {
    next(e);
  }
}

// PUT /coffee-shop/:shopId/rating/:ratingId - Update a rating
export async function updateRating(req: Request, res: Response, next: NextFunction) {
  try {
    const shopId = Number(req.params.shopId);
    const ratingId = Number(req.params.ratingId);

    const [existing] = await db
      .select()
      .from(ratingsTable)
      .where(eq(ratingsTable.id, ratingId));

    if (!existing || existing.coffee_shop_id !== shopId) {
      const error: any = new Error("Rating not found");
      error.status = 404;
      return next(error);
    }

    const [updatedRating] = await db
      .update(ratingsTable)
      .set(req.cleanBody)
      .where(eq(ratingsTable.id, ratingId))
      .returning();

    res.status(200).json(updatedRating);
  } catch (e) {
    next(e);
  }
}

// DELETE /coffee-shop/:shopId/rating/:ratingId - Delete a rating
export async function deleteRating(req: Request, res: Response, next: NextFunction) {
  try {
    const shopId = Number(req.params.shopId);
    const ratingId = Number(req.params.ratingId);

    const [existing] = await db
      .select()
      .from(ratingsTable)
      .where(eq(ratingsTable.id, ratingId));

    if (!existing || existing.coffee_shop_id !== shopId) {
      const error: any = new Error("Rating not found");
      error.status = 404;
      return next(error);
    }

    await db
      .delete(ratingsTable)
      .where(eq(ratingsTable.id, ratingId));

    res.status(204).send();
  } catch (e) {
    next(e);
  }
}
