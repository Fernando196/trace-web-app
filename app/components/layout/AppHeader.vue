<script lang="ts" setup>
import type { Route } from '~/types/route.type'
import MapIcon from '../common/MapIcon.vue'

const eventRoutes = ref<Route[]>([
  {
    name: 'Explorar',
    path: '/',
  },
  {
    name: 'Crear Evento',
    path: '/new-event',
  },
  {
    name: 'Mis Carreras',
    path: '/my-events',
  },
])

const route = useRoute()
</script>
<template>
  <header class="h-17.5 border-b border-b-gray-300 flex justify-between">
    <div class="flex">
      <div class="w-40 ml-5 text-white relative flex items-center">
        <img src="~/assets/img/trace_logo.png" class="h-6" />
        <span class="text-3xl ml-3">Trace</span>
      </div>
      <nav class="h-full pt-5">
        <ul class="flex flex-row gap-4 text-white h-full text-lg font-semibold">
          <li
            v-for="(eventRoute, index) in eventRoutes"
            :key="'nav_li_route_' + index"
            class="cursor-pointer"
            :class="{
              'text-secondary border-b-2 border-b-secondary':
                eventRoute.path === route.path,
            }"
          >
            <NuxtLink :to="eventRoute.path">
              {{ eventRoute.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div
        class="bg-bg-search w-125 ml-10 my-3 rounded-xl text-text flex items-center"
      >
        <MapIcon name="search" class="w-6 ml-3" />
        <input
          placeholder="Buscar carreras, rutas, distancias..."
          class="mx-3 w-full h-full outline-none"
        />
      </div>
    </div>
    <div class="flex"></div>
  </header>
</template>
