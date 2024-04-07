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
  <!-- 
  equipmentID: z.string(),
  issuedTo: z.string(),
  condition: z.string(),
  location: z.string(),
  status: z.string(),
  -->

  <Form.Field {form} name="equipmentID">
    <Form.Control let:attrs>
      <Form.Label>equipmentID</Form.Label>
      <Input {...attrs} bind:value={$formData.equipmentID} />
    </Form.Control>
    <Form.Description>This is your Equipment ID.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  
  <Form.Field {form} name="issuedTo">
    <Form.Control let:attrs>
      <Form.Label>issuedTo</Form.Label>
      <Input {...attrs} bind:value={$formData.issuedTo} />
    </Form.Control>
    <Form.Description>This is your Issued To.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="condition">
    <Form.Control let:attrs>
      <Form.Label>condition</Form.Label>
      <Input {...attrs} bind:value={$formData.condition} />
    </Form.Control>
    <Form.Description>This is your Condition.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  
  <Form.Field {form} name="location">
    <Form.Control let:attrs>
      <Form.Label>location</Form.Label>
      <Input {...attrs} bind:value={$formData.location} />
    </Form.Control>
    <Form.Description>This is your company name.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="status">
    <Form.Control let:attrs>
      <Form.Label>status</Form.Label>
      <Input {...attrs} bind:value={$formData.status} />
    </Form.Control>
    <Form.Description>This is your status.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  
  <Form.Button>Submit</Form.Button>
</form>

<SuperDebug data={formData}/>
</div>

<style>
  div {
    margin: 30px;
  }
</style>