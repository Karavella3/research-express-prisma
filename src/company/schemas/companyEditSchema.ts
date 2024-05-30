import { Company } from '@prisma/client';
import { ZodType, z } from 'zod';
import companyCreateSchema from './companyCreateSchema';

const companyEditSchema: ZodType<Omit<Company, 'createdAt' | 'updatedAt'>> =
  companyCreateSchema.and(
    z.object({
      id: z.number(),
    })
  );

export default companyEditSchema;
