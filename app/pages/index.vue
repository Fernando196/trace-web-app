<script setup lang="ts">
import Map from '~/components/app/Map.vue'
import MarkerEvent from '~/components/app/MarkerEvent.vue'
import SidebarMap from '~/components/app/SidebarMap.vue'

const eventStore = useEventStore()
const { events } = storeToRefs(eventStore)
</script>

<template>
  <div class="h-full flex">
    <sidebar-map class="overflow-x-hidden" />
    <ClientOnly class="flex-1">
      <Map>
        <MarkerEvent
          v-for="event in events"
          :key="'marker-event' + event.id"
          :event="event"
        />
      </Map>
    </ClientOnly>
  </div>
</template>
