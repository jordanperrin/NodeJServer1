import { Request, Response, NextFunction } from "express";
import { db } from "../../db/index";
import { coffeeShopPhotosTable } from "../../db/schema/coffeeShopPhotosSchema";
import { eq } from "drizzle-orm";

// GET /coffee-shop/:shopId/photo - Get all photos for a shop
export async function getPhotosByShop(req: Request, res: Response, next: NextFunction) {
  try {
    const shopId = Number(req.params.shopId);
    const photos = await db
      .select()
      .from(coffeeShopPhotosTable)
      .where(eq(coffeeShopPhotosTable.coffee_shop_id, shopId));
    res.status(200).json(photos);
  } catch (e) {
    next(e);
  }
}

// GET /coffee-shop/:shopId/photo/:photoId - Get a specific photo
export async function getPhotoById(req: Request, res: Response, next: NextFunction) {
  try {
    const shopId = Number(req.params.shopId);
    const photoId = Number(req.params.photoId);
    const [photo] = await db
      .select()
      .from(coffeeShopPhotosTable)
      .where(eq(coffeeShopPhotosTable.id, photoId));

    if (!photo || photo.coffee_shop_id !== shopId) {
      const error: any = new Error("Photo not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(photo);
  } catch (e) {
    next(e);
  }
}

// POST /coffee-shop/:shopId/photo - Upload a photo
// Note: user_id comes from req.body for now, will come from auth token later
export async function createPhoto(req: Request, res: Response, next: NextFunction) {
  try {
    const shopId = Number(req.params.shopId);
    const [photo] = await db
      .insert(coffeeShopPhotosTable)
      .values({ ...req.cleanBody, coffee_shop_id: shopId })
      .returning();
    res.status(201).json(photo);
  } catch (e) {
    next(e);
  }
}

// DELETE /coffee-shop/:shopId/photo/:photoId - Delete a photo
export async function deletePhoto(req: Request, res: Response, next: NextFunction) {
  try {
    const shopId = Number(req.params.shopId);
    const photoId = Number(req.params.photoId);

    const [existing] = await db
      .select()
      .from(coffeeShopPhotosTable)
      .where(eq(coffeeShopPhotosTable.id, photoId));

    if (!existing || existing.coffee_shop_id !== shopId) {
      const error: any = new Error("Photo not found");
      error.status = 404;
      return next(error);
    }

    await db
      .delete(coffeeShopPhotosTable)
      .where(eq(coffeeShopPhotosTable.id, photoId));

    res.status(204).send();
  } catch (e) {
    next(e);
  }
}
