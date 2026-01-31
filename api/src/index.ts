import express, {json, urlencoded} from 'express';
import coffeeShopRoutes from './routes/coffee-shops/index';
import userRoutes from './routes/user/index';
import twcEventRoutes from './routes/twc-event/index';
import uploadRoutes from './routes/upload/index';
import { errorHandler } from './middleware';

const port = 3000;

const app = express();

app.use(urlencoded({extended: false}));
app.use(json());

app.get('/', (req,res)=>{
    res.send("sup");
});

app.use('/coffee-shop', coffeeShopRoutes);

app.use('/user', userRoutes);

app.use('/twc-event', twcEventRoutes);

app.use('/upload', uploadRoutes);

// Error handler must be last
app.use(errorHandler);

app.listen(port, () =>{
    console.log(`App is listnening on port ${port}`);
} );