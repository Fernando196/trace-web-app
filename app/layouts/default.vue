<script setup lang="ts">
import AppSidebar from '~/components/layout/AppSidebar.vue'
import AppHeader from '~/components/layout/AppHeader.vue'
</script>

<template>
  <div
    class="h-screen grid grid-cols-[550px_1fr] grid-rows-[auto_1fr] p-2 gap-2"
  >
    <app-header class="col-span-2" />

    <app-sidebar />

    <main class="bg-bodyBg overflow-auto">
      <slot />
    </main>
  </div>
</template>
