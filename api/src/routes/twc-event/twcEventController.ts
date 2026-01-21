import { Request, Response, NextFunction } from "express";
import { db } from "../../db/index";
import { twcEventsTable } from "../../db/schema/twcEventsSchema";
import { eq } from "drizzle-orm";

// GET /twc-event - List all events
export async function listEvents(req: Request, res: Response, next: NextFunction) {
  try {
    const events = await db.select().from(twcEventsTable);
    res.status(200).json(events);
  } catch (e) {
    next(e);
  }
}

// GET /twc-event/:id - Get a specific event
export async function getEventById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const [event] = await db
      .select()
      .from(twcEventsTable)
      .where(eq(twcEventsTable.id, id));

    if (!event) {
      const error: any = new Error("Event not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(event);
  } catch (e) {
    next(e);
  }
}

// POST /twc-event - Create an event
export async function createEvent(req: Request, res: Response, next: NextFunction) {
  try {
    const [event] = await db
      .insert(twcEventsTable)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(event);
  } catch (e) {
    next(e);
  }
}

// PUT /twc-event/:id - Update an event
export async function updateEvent(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const [event] = await db
      .update(twcEventsTable)
      .set(req.cleanBody)
      .where(eq(twcEventsTable.id, id))
      .returning();

    if (!event) {
      const error: any = new Error("Event not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(event);
  } catch (e) {
    next(e);
  }
}

// DELETE /twc-event/:id - Delete an event
export async function deleteEvent(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const [event] = await db
      .delete(twcEventsTable)
      .where(eq(twcEventsTable.id, id))
      .returning();

    if (!event) {
      const error: any = new Error("Event not found");
      error.status = 404;
      return next(error);
    }

    res.status(204).send();
  } catch (e) {
    next(e);
  }
}