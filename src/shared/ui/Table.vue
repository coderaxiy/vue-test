<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <table>
      <template v-if="customHeader">
        <component :is="customHeader" />
      </template>

      <template v-else>
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.id">
              {{ column.name }}
            </th>
          </tr>
        </thead>
      </template>

      <tbody></tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

type ColumnType = {
  id: number
  name: string
}

const props = defineProps<{
  customHeader?: Component
  columns: ColumnType[]
}>()
</script>
