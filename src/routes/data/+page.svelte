<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import * as Table from "$lib/components/ui/table/index.js";
 
  export let data: PageData;
  const Equipment = data.equipments

  // let Equipment = [];
  // onMount(async () => {
	// 	const response = await fetch('/api'); 
  //   Equipment = await response.json()
	// });
</script>
 
<Table.Root>
  <Table.Caption>A list of ICT Equipments</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head>Equipment ID</Table.Head>
      <Table.Head>Issued To</Table.Head>
      <Table.Head>Condition</Table.Head>
      <Table.Head>Location</Table.Head>
      <Table.Head>Number of Units</Table.Head>
      <Table.Head>Remarks</Table.Head>
      <Table.Head>Status</Table.Head>
      <Table.Head>Usage Rate</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each Equipment as equipment}
      <Table.Row>
        <Table.Cell>{equipment.equipmentID}</Table.Cell>
        <Table.Cell>{equipment.issuedTo}</Table.Cell>
        <Table.Cell>{equipment.condition}</Table.Cell>
        <Table.Cell>{equipment.location}</Table.Cell>
        <Table.Cell>{equipment.noOfUnits}</Table.Cell>
        <Table.Cell>{equipment.remarks}</Table.Cell>
        <Table.Cell>{equipment.status}</Table.Cell>
        <Table.Cell>{equipment.usageRate}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>