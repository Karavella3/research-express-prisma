import { Product } from '@prisma/client';
import { ZodType, z } from 'zod';
import productCreateSchema from './productCreateSchema';

const productEditSchema: ZodType<Omit<Product, 'createdAt' | 'updatedAt'>> =
  productCreateSchema.and(
    z.object({
      id: z.number(),
    })
  );

export default productEditSchema;
