<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { formSchema, type FormSchema } from "./schema";
  import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte"
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
 
  export let data: SuperValidated<Infer<FormSchema>>;
 
  const form = superForm(data, {
    validators: zodClient(formSchema),
  });
 
  const { form: formData, enhance } = form;
</script>
<body class="">
<div class="w-full h-screen content-center bg-slate-500/10 backdrop-blur-md ">
  <div class="mt-auto">
    <div class="w-80 h-96 mx-auto px-6 bg-neutral-50/90 border-2 border-dashed rounded-lg shadow-lg backdrop-blur-md ">
    <form class="my-7 py-10" method="POST" use:enhance>
      <Form.Field {form} name="email">
        <Form.Control let:attrs>
          <Form.Label>Email</Form.Label>
          <Input {...attrs} placeholder="E-mail" bind:value={$formData.email} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      
      <Form.Field {form} name="password">
        <Form.Control let:attrs>  
          <Form.Label>Password</Form.Label>
          <Input {...attrs} type="password" placeholder="password" bind:value={$formData.password} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <div class="container mt-10 mx-auto px-4 justify-center flex ">
      <Form.Button>Login</Form.Button>
      </div>
    </form>

    <!-- <SuperDebug data={formData}/> -->
    </div>
  </div>
</div>
</body>

<style>
</style>