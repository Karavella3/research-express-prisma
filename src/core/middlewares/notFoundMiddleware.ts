import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../utils/NotFoundError';

const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new NotFoundError());
};

export default notFoundMiddleware;
