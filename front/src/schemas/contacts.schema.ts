import { z } from "zod";

export const contactSchemas = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  telephone: z.string(),
  date: z.string(),
});

export type contactData = z.infer<typeof contactSchemas>;
