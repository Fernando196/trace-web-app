<script setup lang="ts">
import Map from '~/features/maps/components/Map.vue'
import MarkerEvent from '~/features/maps/components/MarkerEvent.vue'

const eventStore = useEventStore()
const { events } = storeToRefs(eventStore)
</script>

<template>
  <ClientOnly>
    <Map>
      <MarkerEvent
        v-for="event in events"
        :key="'marker-event' + event.id"
        :event="event"
      />
    </Map>
  </ClientOnly>
</template>
