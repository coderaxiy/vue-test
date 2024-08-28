<script setup lang="ts">
import IconRefresh from '@/components/icons/IconRefresh.vue'
import { ref } from 'vue'

const loading = ref(false)

const refresh = () => {
  loading.value = true
  window.history.go()
}
</script>

<template>
  <button
    @click="refresh"
    class="w-28 flex items-center justify-center gap-2 text-[#344054] text-sm font-semibold border border-[#D0D5DD] rounded-lg py-2.5"
  >
    <IconRefresh :class="{ spin: loading }" />

    Refresh
  </button>
</template>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spin {
  animation: spin 1s linear infinite;
}
</style>
