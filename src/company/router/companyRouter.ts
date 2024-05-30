import { Router } from 'express';

import validationMiddleware from '../../core/middlewares/validationMiddleware';
import companyController from '../controller/companyController';
import companyCreateSchema from '../schemas/companyCreateSchema';
import companyEditSchema from '../schemas/companyEditSchema';
import { companyUserIdSchema } from '../schemas/companyUserIdSchema';

const companyRouter = Router();

companyRouter.get('/list', companyController.list);
companyRouter.get('/:companyId', companyController.getById);
companyRouter.delete('/:companyId', companyController.deleteById);
companyRouter.post(
  '/',
  validationMiddleware(companyCreateSchema),
  companyController.create
);
companyRouter.put(
  '/',
  validationMiddleware(companyEditSchema),
  companyController.edit
);
companyRouter.put(
  '/:companyId/user',
  validationMiddleware(companyUserIdSchema),
  companyController.appendUserByUserId
);
companyRouter.delete(
  '/:companyId/user',
  validationMiddleware(companyUserIdSchema),
  companyController.removeUserByUserId
);

companyRouter.get(
  '/:companyId/user/cart/product/list',
  companyController.listProductsFromUsersCarts
);

export default companyRouter;
