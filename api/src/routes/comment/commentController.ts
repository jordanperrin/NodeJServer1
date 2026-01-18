import { Request, Response, NextFunction } from "express";
import { db } from "../../db/index";
import { coffeeShopCommentsTable } from "../../db/schema/commentsSchema";
import { eq } from "drizzle-orm";

// GET /user/:userId/comment - Get all comments by a user
export async function getCommentsByUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = Number(req.params.userId);
    const comments = await db
      .select()
      .from(coffeeShopCommentsTable)
      .where(eq(coffeeShopCommentsTable.user_id, userId));
    res.status(200).json(comments);
  } catch (e) {
    next(e);
  }
}

// GET /coffee-shop/:shopId/comment - Get all comments for a shop
export async function getCommentsByShop(req: Request, res: Response, next: NextFunction) {
  try {
    const shopId = Number(req.params.shopId);
    const comments = await db
      .select()
      .from(coffeeShopCommentsTable)
      .where(eq(coffeeShopCommentsTable.coffee_shop_id, shopId));
    res.status(200).json(comments);
  } catch (e) {
    next(e);
  }
}

// GET /coffee-shop/:shopId/comment/:commentId - Get a specific comment
export async function getCommentById(req: Request, res: Response, next: NextFunction) {
  try {
    const shopId = Number(req.params.shopId);
    const commentId = Number(req.params.commentId);
    const [comment] = await db
      .select()
      .from(coffeeShopCommentsTable)
      .where(eq(coffeeShopCommentsTable.id, commentId));

    if (!comment || comment.coffee_shop_id !== shopId) {
      const error: any = new Error("Comment not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(comment);
  } catch (e) {
    next(e);
  }
}

// POST /user/:userId/comment - Create a comment (user comments on a shop)
export async function createComment(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = Number(req.params.userId);
    const [comment] = await db
      .insert(coffeeShopCommentsTable)
      .values({ ...req.cleanBody, user_id: userId })
      .returning();
    res.status(201).json(comment);
  } catch (e) {
    next(e);
  }
}

// PUT /coffee-shop/:shopId/comment/:commentId - Update a comment
export async function updateComment(req: Request, res: Response, next: NextFunction) {
  try {
    const shopId = Number(req.params.shopId);
    const commentId = Number(req.params.commentId);

    const [existing] = await db
      .select()
      .from(coffeeShopCommentsTable)
      .where(eq(coffeeShopCommentsTable.id, commentId));

    if (!existing || existing.coffee_shop_id !== shopId) {
      const error: any = new Error("Comment not found");
      error.status = 404;
      return next(error);
    }

    const [updatedComment] = await db
      .update(coffeeShopCommentsTable)
      .set(req.cleanBody)
      .where(eq(coffeeShopCommentsTable.id, commentId))
      .returning();

    res.status(200).json(updatedComment);
  } catch (e) {
    next(e);
  }
}

// DELETE /coffee-shop/:shopId/comment/:commentId - Delete a comment
export async function deleteComment(req: Request, res: Response, next: NextFunction) {
  try {
    const shopId = Number(req.params.shopId);
    const commentId = Number(req.params.commentId);

    const [existing] = await db
      .select()
      .from(coffeeShopCommentsTable)
      .where(eq(coffeeShopCommentsTable.id, commentId));

    if (!existing || existing.coffee_shop_id !== shopId) {
      const error: any = new Error("Comment not found");
      error.status = 404;
      return next(error);
    }

    await db
      .delete(coffeeShopCommentsTable)
      .where(eq(coffeeShopCommentsTable.id, commentId));

    res.status(204).send();
  } catch (e) {
    next(e);
  }
}
