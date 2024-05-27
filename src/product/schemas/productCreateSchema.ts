import { Product } from '@prisma/client';
import { title } from 'process';
import { ZodType, z } from 'zod';

const productCreateSchema: ZodType<Pick<Product, 'title' | 'description'>> = z.object({
  title: z.string(),
  description: z.string().nullable(),
});

export default productCreateSchema;
