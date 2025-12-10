import { Router } from 'express';

//coffee shop endpoints
const router = Router();

router.get('/:id', (req,res)=>{
    console.log(req.params);
    res.send(req.params);
});

router.get('/', (req,res) =>{
    res.send('list of coffee shops')
});

router.post('/', (req, res) =>{
    res.send('New coffee shop made');
});

export default router