import { Request, Response, NextFunction } from "express";
import { db } from "../db/index";
import { zipCodeTable } from "../db/schema/zipCodeSchema";
import { eq } from "drizzle-orm";
import { z, ZodError } from "zod";

export function handleZipCode<T extends z.ZodObject<any, any>>(schema: T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { zip_code, city, state } = req.body;

    try{
        schema.parse(req.body) as z.infer<T>;
    }catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.issues.map((issue: any) => ({
            message: `${issue.path.join(".")} is ${issue.message}`,
          }));
          return res.status(400).json({ error: "Invalid data", details: errorMessages });
        } else {
          return res.status(500).json({ error: "Internal Server Error" });
        }
      }
    
    const exisitingZip = await db
      .select({ id: zipCodeTable.id })
      .from(zipCodeTable)
      .where(eq(zipCodeTable.zip_code, zip_code))
      .limit(1);

    let zip_id: number;

    if (exisitingZip.length > 0) {
      zip_id = exisitingZip[0].id;
      
    } else {
        const [newZip] = await db
          .insert(zipCodeTable)
          .values({
            zip_code: zip_code,
            city: req.body.city,
            state: req.body.state,
          })
          .returning({ id: zipCodeTable.id });

        zip_id = newZip.id;
      }

    req.body.zip_id = zip_id;
    next();
  };
}
