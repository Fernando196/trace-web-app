<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue'
</script>

<template>
  <div class="h-screen flex flex-col">
    <app-header class="col-span-2" />

    <main class="bg-bodyBg overflow-auto flex-1">
      <slot />
    </main>
  </div>
</template>
