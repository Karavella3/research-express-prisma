import { ProductsInCarts } from '@prisma/client';
import { ZodType, z } from 'zod';

const cartProductSchema: ZodType<Pick<ProductsInCarts, 'productId' | 'count'>> =
  z.object({
    productId: z.number(),
    count: z.number().gte(0),
  });

export default cartProductSchema;
