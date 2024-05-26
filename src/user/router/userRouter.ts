import { Router } from 'express';

import validationMiddleware from '../../core/middlewares/validationMiddleware';
import userController from '../controller/userController';
import userCreateSchema from '../schemas/userCreateSchema';
import userEditSchema from '../schemas/userEditSchema';

const userRouter = Router();

userRouter.get('/list', userController.list);
userRouter.get('/:userId', userController.getById);
userRouter.delete('/:userId', userController.deleteById);
userRouter.post(
  '/',
  validationMiddleware(userCreateSchema),
  userController.create
);
userRouter.put('/', validationMiddleware(userEditSchema), userController.edit);

export default userRouter;
