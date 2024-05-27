import { Router } from 'express';

import validationMiddleware from '../../core/middlewares/validationMiddleware';
import productController from '../controller/productController';
import productCreateSchema from '../schemas/productCreateSchema';
import productEditSchema from '../schemas/productEditSchema';

const productRouter = Router();

productRouter.get('/list', productController.list);
productRouter.get('/:productId', productController.getById);
productRouter.delete('/:productId', productController.deleteById);
productRouter.post(
  '/',
  validationMiddleware(productCreateSchema),
  productController.create
);
productRouter.put('/', validationMiddleware(productEditSchema), productController.edit);

export default productRouter;
