import { User } from '@prisma/client';
import { ZodType, z } from 'zod';

const userCreateSchema: ZodType<Pick<User, 'name' | 'surname'>> = z.object({
  name: z.string(),
  surname: z.string(),
});

export default userCreateSchema;
