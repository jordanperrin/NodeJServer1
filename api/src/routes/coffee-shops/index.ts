import { Router } from 'express';
import { listShops, getShopById, createShop, updateShop, deleteShop} from './coffeeShopController';
import { validateData } from '../../middleware/validationMiddleware';
import { createShopSchema, updateShopSchema } from  '../../db/schema/coffeeShopSchema';

//coffee shop endpoints

/*
validateData method is just checking if the headers that are passed in 
req.body are the same rows and types of my table, but then once it's validated 
as the same and it gets passed to the controller, all the variables passed in 
the req.body are interpreted at compile time as any even though at runtime our 
contorller might try to do specific logic like convert string to all uppercase,
but that variable at runtime might be a number and then we have an issue and our app crashes
*/

const router = Router();

router.get('/:id', getShopById);
router.get('/', listShops);
router.post('/', validateData(createShopSchema), createShop);
router.put('/:id',validateData(updateShopSchema), updateShop)
router.delete('/:id', deleteShop);

export default router;