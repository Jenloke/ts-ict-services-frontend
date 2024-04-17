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

  // import CalendarIcon from "svelte-radix/Calendar.svelte";
  import {
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
    parseDate,
    today
  } from "@internationalized/date";
  // import { toast } from "svelte-sonner";
  // import { browser } from "$app/environment";
  // import { page } from "$app/stores";
  import { cn } from "$lib/utils.js";
  import {
    buttonVariants
  } from "$lib/components/ui/button/index.js";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";

  const df = new DateFormatter("en-US", {
    dateStyle: "long"
  });

  let value: DateValue | undefined;
 
  $: value = $formData.startDate ? parseDate($formData.startDate) : undefined;
 
  let placeholder: DateValue = today(getLocalTimeZone());

</script>
 
<div class="w-screen content-centers">
  <div class="w-6/12 mx-auto py-12 px-12 bg-zinc-50 border-2 border-dashed rounded-lg shadow-lg">
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

    <Form.Field {form} name="startDate" class="flex flex-col">
      <Form.Control let:attrs>
        <Form.Label>Start Date</Form.Label>
        <Popover.Root>
          <Popover.Trigger
            {...attrs}
            class={cn(
              buttonVariants({ variant: "outline" }),
              "w-[280px] justify-start pl-4 text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            {value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a start date"}
          </Popover.Trigger>
          <Popover.Content class="w-auto p-0" side="top">
            <Calendar
              {value}
              bind:placeholder
              minValue={today(getLocalTimeZone())}
              
              calendarLabel="Start Date"
              initialFocus
              onValueChange={(v) => {
                if (v) {
                  $formData.startDate = v.toString();
                } else {
                  $formData.startDate = "";
                }
              }}
            />
          </Popover.Content>
        </Popover.Root>
        <Form.Description>
          Your date of birth is used to calculator your age
        </Form.Description>
        <Form.FieldErrors />
        <input hidden value={$formData.startDate} name={attrs.name} />
      </Form.Control>
    </Form.Field>
    
    <Form.Button>Submit</Form.Button>
  </form>
<!-- 
  <SuperDebug data={formData}/> -->
  </div>
</div>
