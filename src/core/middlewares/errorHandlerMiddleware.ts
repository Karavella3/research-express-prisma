import { NextFunction, Request, Response } from 'express';
import { getErrorInfo } from '../utils/getErrorInfo';

const errorHandlerMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[error] ${JSON.stringify(err)}`);

  const info = getErrorInfo(err);
  const { status, error, details } = info;

  res.status(status).json({ error, details });
};

export default errorHandlerMiddleware;
