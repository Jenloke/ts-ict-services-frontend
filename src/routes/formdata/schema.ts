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
  

  // NEW
  // itemNumber: z.string //auto-generated format:
	// propertyNumber: z.string //auto-generated format:
	category: z.string(), //tbs 
	// specification:
		processor: z.string().optional(),
		motherboard: z.string().optional(),
    hdd: z.string().optional(),
    memory: z.string().optional(),
    videocard: z.string().optional(),
    display: z.string().optional(),
    opticaldriver: z.string().optional(),
    casing: z.string().optional(),
    mouse: z.string().optional(),
    keyboard: z.string().optional(),
	dateOfAcquisition: z.date(), // default is date now
	// status: automatically set at new \
	// location
		department: z.string(),
    room: z.string(),
	campus: z.string(),
	handler: z.string(),
	units: z.number().int().default(1),

}).required();
 
export type FormSchema = typeof formSchema;