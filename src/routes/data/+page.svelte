<script lang="ts">
  import type { PageData } from "./$types";
  import { createTable, Render, Subscribe, createRender } from "svelte-headless-table";
  import { addPagination, addSortBy, addTableFilter, addHiddenColumns, } from "svelte-headless-table/plugins";
  import { readable } from "svelte/store";
  import ChevronDown from "lucide-svelte/icons/chevron-down";
  import * as Table from "$lib/components/ui/table/index.js";
  import DataTableActions from "./data-table-actions.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  
  export let data: PageData;
  const Equipment = data.equipments
  
  const table = createTable(readable(Equipment),{
    page: addPagination(),
    sort: addSortBy(),
    filter: addTableFilter({
      fn: ({ filterValue, value }) =>
        value.toLowerCase().includes(filterValue.toLowerCase()),
    }),
    hide: addHiddenColumns(),
  });

  const columns = table.createColumns([
    table.column({
      accessor: "equipmentID",
      header: "Equipment ID",
    }),
    table.column({
      accessor: "issuedTo",
      header: "Issued To",
    }),
    table.column({
      accessor: "condition",
      header: "Condition",
    }),
    table.column({
      accessor: "location",
      header: "Location",
    }),
    table.column({
      accessor: "noOfUnits",
      header: "Number of Units",
    }),
    table.column({
      accessor: "remarks",
      header: "Remarks",
      plugins: {
        filter: {
          exclude: true,
        },
      },
    }),
    table.column({
      accessor: "status",
      header: "Status",
    }),
    table.column({
      accessor: "usageRate",
      header: "Usage Rate",
      plugins: {
        filter: {
          exclude: true,
        },
      },
    }),
    table.column({
      accessor: ({ equipmentID }) => equipmentID,
      header: "",
      cell: ({ value }) => {
        return createRender(DataTableActions, { id: value });
      },
    }),
    table.column({
      accessor: "startDate",
      header: "Start Date",
    }),
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, } =
    table.createViewModel(columns);

  const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
  const { filterValue } = pluginStates.filter;
  const { hiddenColumnIds } = pluginStates.hide;

  const ids = flatColumns.map((col) => col.id);
  let hideForId = Object.fromEntries(ids.map((equipmentid) => [equipmentid, true]));

  $: $hiddenColumnIds = Object.entries(hideForId)
    .filter(([, hide]) => !hide)
    .map(([equipmentid]) => equipmentid);
 
  const hidableCols = ["numOfUnits", "remarks", "usageRate"];
</script>

<div class="w-9/12 mx-auto px-4 bg-zinc-50 border-2 border-dashed rounded-lg shadow-lg">
  <div class="flex items-center py-4">
    <Input
      class="max-w-sm"
      placeholder="Filter equipment..."
      type="text"
      bind:value={$filterValue}
    />
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button variant="outline" class="ml-auto" builders={[builder]}>
          Columns <ChevronDown class="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {#each flatColumns as col}
          {#if hidableCols.includes(col.id)}
            <DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
              {col.header}
            </DropdownMenu.CheckboxItem>
          {/if}
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
  <div class="rounded-md border">
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                  <Table.Head {...attrs}>
                    <Render of={cell.render()} />
                  </Table.Head>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>
      <Table.Body {...$tableBodyAttrs}>
        {#each $pageRows as row (row.id)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <Table.Row {...rowAttrs}>
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell {...attrs}>
                    <Render of={cell.render()} />
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
  <div class="flex items-center justify-end space-x-4 py-4">
    <Button
      variant="outline"
      size="sm"
      on:click={() => ($pageIndex = $pageIndex - 1)}
      disabled={!$hasPreviousPage}>Previous</Button
    >
    <Button
      variant="outline"
      size="sm"
      disabled={!$hasNextPage}
      on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
    >
  </div>
</div>

<!--
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
-->

