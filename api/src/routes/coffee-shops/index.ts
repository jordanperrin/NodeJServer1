import { Router } from 'express';
import { listShops } from './coffeeShopController';

//coffee shop endpoints
const router = Router();

router.get('/:id', listShops);

router.get('/', (req,res) =>{
    res.send('list of coffee shops')
});

router.post('/', (req, res) =>{
    res.send('New coffee shop made');
});

export default router``