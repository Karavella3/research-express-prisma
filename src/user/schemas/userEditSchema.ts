import { User } from '@prisma/client';
import { ZodType, z } from 'zod';
import userCreateSchema from './userCreateSchema';

const userEditSchema: ZodType<Omit<User, 'createdAt' | 'cartId'>> =
  userCreateSchema.and(
    z.object({
      id: z.number(),
    })
  );

export default userEditSchema;
