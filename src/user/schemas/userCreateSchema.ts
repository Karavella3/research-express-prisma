import { Prisma } from '@prisma/client';
import { ZodType, z } from 'zod';

const userCreateSchema: ZodType<Prisma.UserCreateInput> = z.object({
  name: z.string(),
  surname: z.string(),
});

export default userCreateSchema;
