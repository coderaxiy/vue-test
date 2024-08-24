<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppSidebar from './components/layouts/AppSidebar.vue'
import AppHeader from './components/layouts/AppHeader.vue'
</script>

<template>
  <div class="flex h-screen">
    <AppSidebar />

    <div class="flex-1 flex flex-col">
      <AppHeader />

      <main class="flex-1 overflow-y-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
