<script setup lang="ts">
import type { LatLngExpression } from 'leaflet'
import type { ComponentPublicInstance } from 'vue'
import MapLeaflet from '~/components/app/Map.vue'
import MarkerEvent from '~/components/app/MarkerEvent.vue'
import SidebarMap from '~/components/app/SidebarMap.vue'
import type { LMarker } from '~/types/leaftlet.type'

const eventStore = useEventStore()
const { events, selectedEvent } = storeToRefs(eventStore)

const visibleCoords = ref<LatLngExpression[] | []>([])
let interval: number
const markerRefs = new Map<string | number, LMarker>()
const mapRef = ref<InstanceType<typeof MapLeaflet> | null>(null)

const setMarkerRef = (
  el: Element | ComponentPublicInstance | null,
  id: string | number
) => {
  if (el) markerRefs.set(id, el as unknown as LMarker)
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
  (newSelected, oldSelected) => {
    animateRoute()
    const selected = newSelected || oldSelected
    if (!selected) return
    const targerMarker = markerRefs.get(selected.id)
    if (targerMarker) {
      targerMarker.handleChangePopup(newSelected !== null)
      if (!mapRef.value) return
      if (newSelected !== null)
        mapRef.value.centerMapOnBounds(selected.coords as [number, number][])
    }
  }
)
</script>

<template>
  <div class="h-full flex">
    <sidebar-map class="overflow-x-hidden" />
    <ClientOnly class="flex-1">
      <MapLeaflet ref="mapRef">
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
