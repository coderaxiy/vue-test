<script setup lang="ts">
import { type Component } from 'vue'

defineProps<{
  placeholder: string
  name: string
  icon?: Component
  iconPlacement?: 'start' | 'end'
}>()
</script>

<template>
  <div
    :class="[
      'flex items-center gap-2 border border-[#D0D5DD] py-2 px-3.5 rounded-md min-w-[300px]',
      iconPlacement === 'end' ? 'flex-row-reverse' : ''
    ]"
  >
    <component :is="icon" />

    <input class="w-full h-full outline-none" type="text" :placeholder="placeholder" />
  </div>
</template>
