import { z } from "zod";
 

// update schema 
export const formSchema = z.object({
  username: z.string().min(5),
  company: z.string().min(1),
  email: z.string().email()
});
 
export type FormSchema = typeof formSchema;