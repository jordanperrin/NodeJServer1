import { Request, Response, NextFunction } from 'express';
import { z, ZodError} from 'zod';

export function updatedAt(){
    return(req:Request, res: Response, next: NextFunction) => {
        if(req.body.updated_at === undefined && req.method === 'PUT'){
            req.body.updated_at = new Date();
        }
        next();
    };   
}