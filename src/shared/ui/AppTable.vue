<template>
  <div class="w-full">
    <table class="w-full table-fixed border-collapse bg-white rounded-lg border border-[#EAECF0]">
      <thead
        class="bg-[#F9FAFB] border border-[#EAECF0] sticky top-[-0.5] text-[#475467] text-sm font-medium text-left"
      >
        <tr class="h-11">
          <th
            class="py-3 first:pl-6 last:pr-6"
            :style="{ width: column.width }"
            v-for="column in columns"
            :key="column.id"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody class="*:border-b *:border-[#EAECF0] text-[#101828] text-sm font-normal">
        <component
          class="h-[72px] *:pr-2"
          v-for="row in rows"
          :key="row.id"
          :is="renderItem"
          v-bind="row"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

type ColumnType = {
  id: number
  name: string
  width?: number | string
}

const props = defineProps<{
  columns: ColumnType[]
  rows: any[]
  renderItem: Component
}>()
</script>
