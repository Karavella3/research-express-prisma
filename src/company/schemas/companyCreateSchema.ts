import { Company } from '@prisma/client';
import { ZodType, z } from 'zod';

const companyCreateSchema: ZodType<Pick<Company, 'name'>> = z.object({
  name: z.string(),
});

export default companyCreateSchema;
