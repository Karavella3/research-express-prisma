import dotenv from 'dotenv';
import express from 'express';
import cartRouter from './cart/router/cartRouter';
import errorHandlerMiddleware from './core/middlewares/errorHandlerMiddleware';
import notFoundMiddleware from './core/middlewares/notFoundMiddleware';
import productRouter from './product/router/productRouter';
import userRouter from './user/router/userRouter';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/product', productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at port: ${port}`);
});
