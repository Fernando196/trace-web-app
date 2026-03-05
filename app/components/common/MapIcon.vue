<template>
  <component :is="componentMap[name]" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { defineAsyncComponent, type Component } from 'vue'

const componentMap: Record<string, Component> = {
  facebook: defineAsyncComponent(() => import('./icons/FacebookIcon.vue')),
  location: defineAsyncComponent(() => import('./icons/LocationIcon.vue')),
  route: defineAsyncComponent(() => import('./icons/RouteIcon.vue')),
  search: defineAsyncComponent(() => import('./icons/SearchIcon.vue')),
  runner: defineAsyncComponent(() => import('./icons/RunnerIcon.vue')),
}

type Icons = 'facebook' | 'location' | 'route' | 'search' | 'runner'

defineProps<{
  name: Icons
}>()
</script>
