import {Request, Response} from 'express'

export function listShops(req: Request, res: Response){
    res.send('listShops');
}

export function getShopById(req: Request, res: Response){
    res.send('getShopById');
}

export function createShop(req: Request, res: Response){
    console.log(req.body)
    res.send('createShop');
}

export function updateShop(req: Request, res: Response){
    res.send('updateShop');
}

export function deleteShop(req: Request, res: Response){
    res.send('deleteShop');
}