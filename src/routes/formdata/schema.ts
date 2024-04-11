import { z } from "zod";
 
// equipment ID
// issued to
// condition
// location
// status
// usage rate

// update schema 
export const formSchema = z.object({
  // username: z.string().min(5),
  // company: z.string().min(1),
  // email: z.string().email()

  equipmentID: z.string(),
  issuedTo: z.string(),
  condition: z.string(),
  location: z.string(),
  status: z.string(),
  startDate: 
    z.string()
    .refine((v) => v, {
      message: "Date of start of lifespanm is required."
    }),
  // startDate: z.coerce.date(),
}).required();
 
export type FormSchema = typeof formSchema;