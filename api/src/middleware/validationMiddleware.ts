import { Request, Response, NextFunction } from 'express';
import { z, ZodError} from 'zod';

export function validateData<T extends z.ZodObject<any, any>>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      //now we are directly inferring the type from the zod schema, makes it dynamic for every zod schema typ
      req.cleanBody = schema.parse(req.body) as z.infer<T>;
      next();// if all data is verified we send it to the next middleware or the controller
    } catch (error) {
      if (error instanceof ZodError) { 
        const errorMessages = error.issues.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));
        res.status(400).json({ error: "Invalid data", details: errorMessages });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}