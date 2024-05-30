import { z } from 'zod';

export const companyUserIdSchema = z.object({
  userId: z.number(),
});
