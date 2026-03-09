<script setup lang="ts">
import type { LatLngExpression } from 'leaflet'
import MapLeaflet from '~/components/app/Map.vue'
import MarkerEvent from '~/components/app/MarkerEvent.vue'
import SidebarMap from '~/components/app/SidebarMap.vue'

const eventStore = useEventStore()
const { events, selectedEvent } = storeToRefs(eventStore)

const visibleCoords = ref<LatLngExpression[] | []>([])
let interval: number
const markerRefs = new Map<string | number, any>()

const setMarkerRef = (el: any, id: string | number) => {
  if (el) markerRefs.set(id, el)
}

const animateRoute = () => {
  if (interval) clearInterval(interval)
  visibleCoords.value = []
  let i = 0

  const coords = selectedEvent.value?.coords
  if (!coords?.length) return

  interval = setInterval(() => {
    if (i < coords.length) {
      visibleCoords.value = [...(visibleCoords.value || []), coords[i]!]
      i++
    } else {
      clearInterval(interval)
    }
  }, 50)
}

watch(
  () => selectedEvent.value,
  () => {
    animateRoute()
    const targerMarker = markerRefs.get(selectedEvent.value?.id!)
    if (targerMarker) {
      targerMarker.handleChangePopup(true)
    }
  }
)
</script>

<template>
  <div class="h-full flex">
    <sidebar-map class="overflow-x-hidden" />
    <ClientOnly class="flex-1">
      <MapLeaflet>
        <MarkerEvent
          v-for="event in events"
          :key="'marker-event' + event.id"
          :event="event"
          @click="eventStore.updateSelectedEvent(event)"
          :ref="(el) => setMarkerRef(el, event.id)"
        />
        <LPolyline
          v-if="visibleCoords?.length"
          :lat-lngs="visibleCoords"
          color="#b6e56e"
          :weight="5"
          :opacity="1"
        />
      </MapLeaflet>
    </ClientOnly>
  </div>
</template>
