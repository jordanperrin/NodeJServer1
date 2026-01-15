import { Request, Response, NextFunction } from "express";
import { db } from "../../db/index";
import { userTable } from "../../db/schema/usersSchema";
import { eq } from "drizzle-orm";

export async function listUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await db.select().from(userTable);
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id));

    if (!user) {
      const error: any = new Error("user not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const [user] = await db
      .insert(userTable)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;

    const [updatedUser] = await db
      .update(userTable)
      .set(updatedFields)
      .where(eq(userTable.id, id))
      .returning();

    if (!updatedUser) {
      const error: any = new Error("User not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(updatedUser);
  } catch (e) {
    next(e);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const [deletedUser] = await db
      .delete(userTable)
      .where(eq(userTable.id, id))
      .returning();

    if (!deletedUser) {
      const error: any = new Error("User not found");
      error.status = 404;
      return next(error);
    }

    res.status(204).send();
  } catch (e) {
    next(e);
  }
}
