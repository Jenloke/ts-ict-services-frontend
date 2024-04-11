<script lang="ts">
  import type { PageData } from "./$types";
  import * as Table from "$lib/components/ui/table/index.js";
 
  export let data: PageData;
  const Equipment = data.equipments
</script>

<div class="container">
<Table.Root class="w-900 bg-gray-500/10 border-spacing-2 border border-slate-500">
  <Table.Caption>A list of ICT Equipments</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="bg-gray-500/10 border-spacing-2 border border-slate-500">Equipment ID</Table.Head>
      <Table.Head class="bg-gray-500/10 border-spacing-2 border border-slate-500">Issued To</Table.Head>
      <Table.Head class="bg-gray-500/10 border-spacing-2 border border-slate-500">Condition</Table.Head>
      <Table.Head class="bg-gray-500/10 border-spacing-2 border border-slate-500">Location</Table.Head>
      <Table.Head class="bg-gray-500/10 border-spacing-2 border border-slate-500">Number of Units</Table.Head>
      <Table.Head class="bg-gray-500/10 border-spacing-2 border border-slate-500">Remarks</Table.Head>
      <Table.Head class="bg-gray-500/10 border-spacing-2 border border-slate-500">Status</Table.Head>
      <Table.Head class="bg-gray-500/10 border-spacing-2 border border-slate-500">Usage Rate</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each Equipment as equipment}
      <Table.Row>
        <Table.Cell class="bg-gray-500/10 border-spacing-2  border-slate-500">{equipment.equipmentID}</Table.Cell>
        <Table.Cell>{equipment.issuedTo}</Table.Cell>
        <Table.Cell class="bg-gray-500/10 border-spacing-2  border-slate-500">{equipment.condition}</Table.Cell>
        <Table.Cell>{equipment.location}</Table.Cell>
        <Table.Cell class="bg-gray-500/10 border-spacing-2  border-slate-500">{equipment.noOfUnits}</Table.Cell>
        <Table.Cell>{equipment.remarks}</Table.Cell>
        <Table.Cell class="bg-gray-500/10 border-spacing-2  border-slate-500">{equipment.status}</Table.Cell>
        <Table.Cell>{equipment.usageRate}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
</div>