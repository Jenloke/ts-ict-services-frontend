import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";

// @ts-ignore
import { equipment } from "$db/collection";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    // make post request to mongodb
    let { data } = form

    console.log(data)
    console.log(data.startDate)
    console.log(typeof(data.startDate))

    // const result = await equipment.insertOne({ equipmentID, issuedTo, condition, location, noOfUnits, remarks, status, usageRate});
    
    try {
      await equipment.insertOne({...data});
      console.log("data inserted")
    } catch (error) {
      console.log(error)
    }

    return {
      form,
    };
  },
};


//create - done
// export async function POST({ request }) {
//   // const { request } = requestEvent;
//   const { equipmentID, issuedTo, condition, location, noOfUnits, remarks, status, usageRate } = await request.json();

//   //auth object

//   try {
//     const result = await createEquipment(equipmentID, issuedTo, condition, location, noOfUnits, remarks, status, usageRate);
//     return json(result, {status: 201, message: 'Equipment added'})
//   } catch (error) {
//     console.error('Error creating equipment:', error);
//     return {
//       status: 500,
//       body: { message: 'Internal server error' }
//     };
//   }
// }