import express, {json, urlencoded} from 'express';
import coffeeShopRoutes from './routes/coffee-shops/index';

const port = 3000;

const app = express();
//middleware -> allows us to add logic in between reqest and controllers
app.use(urlencoded({extended: false}));
app.use(json());

app.get('/', (req,res)=>{
    res.send("sup");
});

app.use('/coffee-shops', coffeeShopRoutes);

app.listen(port, () =>{
    console.log(`App is listnening on port ${port}`);
} );