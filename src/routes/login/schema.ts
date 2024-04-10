import { z } from "zod";
 
export const formSchema = z.object({
  email: z.string(),
  password: z.string(),
}).required();
 
export type FormSchema = typeof formSchema;