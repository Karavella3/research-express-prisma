import cartRouter from './cart/router/cartRouter';
import errorHandlerMiddleware from './core/middlewares/errorHandlerMiddleware';
import notFoundMiddleware from './core/middlewares/notFoundMiddleware';
import productRouter from './product/router/productRouter';
import userRouter from './user/router/userRouter';
import companyRouter from './company/router/companyRouter';
import init from './core/utils/init';

const { app, port } = init();

app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/product', productRouter);
app.use('/company', companyRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
