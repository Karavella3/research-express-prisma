import { Router } from 'express';
import validationMiddleware from '../../core/middlewares/validationMiddleware';
import cartController from '../controller/cartController';
import cartProductSchema from '../schemas/cartProductSchema';

const cartRouter = Router();

cartRouter.get('/:cartId', cartController.getById);
cartRouter.put(
  '/:cartId/product',
  validationMiddleware(cartProductSchema),
  cartController.product
);

export default cartRouter;
