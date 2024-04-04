<script lang="ts">
  //import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  //import { Button } from "$lib/components/ui/button/index.js";
  import { superForm } from "sveltekit-superforms/client";
  import SuperDebug from 'sveltekit-superforms';
  //import { page } from '$app/stores';

  import type { PageData } from './$types.js';

  export let data: PageData;

  const { form, message, enhance } = superForm(data.form);
</script>

<SuperDebug data={$form} collapsible />

<h3>{$message}</h3>

<form method="POST" action="?/login" use:enhance>
    <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label for="username">Username</Label>
        <input name="username" type="username" bind:value={$form.username} />
    </div>
    <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label for="password">Password</Label>
        <input name="password" type="password" bind:value={$form.password} />
    </div>
    <button>LogIn</button>
</form>