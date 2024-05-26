import { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';

const validationMiddleware =
  <SchemaT extends ZodType>(schema: SchemaT) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };

export default validationMiddleware;
