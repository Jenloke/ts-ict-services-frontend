<script lang="ts">
  import type { PageData } from "./$types.js";
  import EquipmentForm from "./equipment-form.svelte";
  export let data: PageData;
</script>
 
<EquipmentForm data={data.form} />


