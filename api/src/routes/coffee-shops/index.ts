import { Router } from 'express';
import { listShops, getShopById, createShop, updateShop, deleteShop} from './coffeeShopController';

//coffee shop endpoints
const router = Router();

router.get('/:id', getShopById);
router.get('/', listShops);
router.post('/', createShop);
router.put('/:id', updateShop)
router.delete('/:id', deleteShop);

export default router;