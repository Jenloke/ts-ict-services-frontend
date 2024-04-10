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
 

<div>
<form method="POST" use:enhance>
  <Form.Field {form} name="email">
    <Form.Control let:attrs>
      <Form.Label>Email</Form.Label>
      <Input {...attrs} bind:value={$formData.email} />
    </Form.Control>
    <Form.Description>This is your Equipment ID.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  
  <Form.Field {form} name="password">
    <Form.Control let:attrs>  
      <Form.Label>Password</Form.Label>
      <Input {...attrs} type="password" bind:value={$formData.password} />
    </Form.Control>
    <Form.Description>This is your Issued To.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  
  <Form.Button>Login</Form.Button>
</form>

<SuperDebug data={formData}/>
</div>

<style>
  div {
    margin: 30px;
  }
</style>