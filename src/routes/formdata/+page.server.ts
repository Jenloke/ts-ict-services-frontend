import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";

import { POST } from "../api/+server.js";

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
    console.log(form.data)

    console.log(form.data.username)
    console.log(form.data.company)
    console.log(form.data.email)

    // const { equipmentID, issuedTo, condition, location, noOfUnits, remarks, status, usageRate } = await request.json();
    // const res = await fetch() // link to website
    // POST()


    return {
      form,
    };
  },
};