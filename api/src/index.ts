import express, {Router} from 'express';
import coffeeShopRoutes from './routes/coffee-shops/index';

const port = 3000;

const app = express();

app.get('/', (req,res)=>{
    res.send("sup");
});

app.use('/coffee-shops', coffeeShopRoutes);

app.listen(port, () =>{
    console.log(`App is listnening on port ${port}`);
} );