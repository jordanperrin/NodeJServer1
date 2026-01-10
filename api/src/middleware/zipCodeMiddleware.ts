import { Request, Response, NextFunction } from 'express';
import { db } from "../db/index";
import { zipCodeTable } from 'src/db/schema/zipCodeSchema';

export function handleZipCode(){
    return async (req:Request, res: Response, next: NextFunction) => {
        const { zip_code, city, state } = req.body;
        if(!zip_code){
            return res.status(400).json({error: 'zip required'});
        }else if(!city){
            return res.status(400).json({error: 'city required'});
        }else if(!state){
            return res.status(400).json({error: 'state required'});
        }//need to validate all these properly

        //check if zip already exists
        const exisitingZip = await db.select({id: zipCodeTable.id}).from(zipCodeTable).where(eq(zipCodeTable.zip, zip)).limit(1);

        let zip_id: number;

        if(exisitingZip.length > 0){
            zip_id = exisitingZip[0].id
        }else{
            const [newZip] = await db
            .insert(zipCodeTable)
            .values({
                zip_code,
                city: req.body.city,
                state: req.body.state
            })
            .returning({id: zipCodeTable.id})

            zip_id = newZip.id;
        }
        req.body.zip_id = zip_id;
        next();
    };
}