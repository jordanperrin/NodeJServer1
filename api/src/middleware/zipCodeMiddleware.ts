import { Request, Response, NextFunction } from "express";
import { db } from "../db/index";
import { zipCodeTable, createZipCodeSchema } from "../db/schema/zipCodeSchema";
import { eq } from "drizzle-orm";
import { z, ZodError } from "zod";
import { validateData } from "./validationMiddleware";

export function handleZipCode<T extends z.ZodObject<any, any>>(schema: T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { zip_code, city, state } = req.body;
    if (!zip_code) {
      return res.status(400).json({ error: "zip required" });
    } else if (!city) {
      return res.status(400).json({ error: "city required" });
    } else if (!state) {
      return res.status(400).json({ error: "state required" });
    } //need to validate all these properly

    //check if zip already exists
    const exisitingZip = await db
      .select({ id: zipCodeTable.id })
      .from(zipCodeTable)
      .where(eq(zipCodeTable.zip_code, zip_code))
      .limit(1);

    let zip_id: number;

    if (exisitingZip.length > 0) {
      zip_id = exisitingZip[0].id;
      req.body.zip_id = zip_id;
      next();
    } else {
      try {
        schema.parse(req.body) as z.infer<T>;

        const [newZip] = await db
          .insert(zipCodeTable)
          .values({
            zip_code: zip_code,
            city: req.body.city,
            state: req.body.state,
          })
          .returning({ id: zipCodeTable.id });

        zip_id = newZip.id;
        
        req.body.zip_id = zip_id;
        next();
      } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.issues.map((issue: any) => ({
            message: `${issue.path.join(".")} is ${issue.message}`,
          }));
          console.log("zip error catch")
          res.status(400).json({ error: "Invalid data", details: errorMessages });
        } else {
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    }

  };
}
