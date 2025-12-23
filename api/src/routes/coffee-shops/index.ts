import { Router } from 'express';
import { listShops, getShopById, createShop, updateShop, deleteShop} from './coffeeShopController';
import { validateData } from '../../middleware/validationMiddleware';
import {z} from 'zod';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { coffeeShopsTable } from '../../db/schema/coffeeShopSchema';


// const createShopSchema = z.object({
//     name: z.string(),
//     address: z.string(),
//     rating: z.string(),
//     total_ratings: z.number(),
//     average_rating: z.string()
// })
//coffee shop endpoints

const createShopSchema = createInsertSchema(coffeeShopsTable).strict();
/*
validateData method is just checking if the headers that are passed in 
req.body are the same rows and types of my table, but then once it's validated 
as the same and it gets passed to the controller, all the variables passed in 
the req.body are interpreted at compile time as any even though at runtime our 
contorller might try to do specific logic like convert string to all uppercase,
but that variable at runtime might be a number and then we have an issue and our app crashes
*/
type InsertType = z.infer<typeof createShopSchema>; 
const router = Router();

router.get('/:id', getShopById);
router.get('/', listShops);
router.post('/', validateData(createShopSchema), createShop);
router.put('/:id', updateShop)
router.delete('/:id', deleteShop);

export default router;