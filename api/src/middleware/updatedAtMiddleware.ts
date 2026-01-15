import { Request, Response, NextFunction } from 'express';

export function updatedAt(req:Request, res: Response, next: NextFunction){
        if(req.method === 'PUT'){
            req.body.updated_at = new Date();
        }
        next();
}