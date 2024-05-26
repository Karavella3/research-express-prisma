import { ZodError } from 'zod';
import { ErrorInfo } from './ErrorInfo';

export const getErrorInfo = (err: unknown): ErrorInfo => {
  if (err instanceof ZodError) {
    return new ErrorInfo({
      status: 400,
      error: 'Bad Request',
      details: err.errors,
    });
  }

  if (err instanceof ErrorInfo) {
    return err;
  }

  return new ErrorInfo();
};
