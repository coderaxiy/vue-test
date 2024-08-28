<script setup lang="ts">
defineProps<{
  classes: string
}>()
</script>

<template>
  <div :class="['w-11 h-6 rounded-2xl flex items-center justify-center', classes]">
    <slot></slot>
  </div>
</template>
