import { z } from 'zod'
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';

const loginSchema = z.object({
  username: z.string(),
  password: z.string()
}).required();

export const load = async () => {

  const form = await superValidate(zod(loginSchema));

  console.log("loaded");
  return { form };
};

export const actions = {
  login: async ({ request }) => {
    const form = await superValidate(request, zod(loginSchema));
    
    if (!form.valid) return fail(400, { form });
  
    // route to wherever
    return message(form, 'Login form submitted');
  }
};