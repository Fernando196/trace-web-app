<script lang="ts" setup>
import { setOptions, importLibrary } from '@googlemaps/js-api-loader'

const config = useRuntimeConfig()
const mapRef = ref<HTMLDivElement | null>(null)

onMounted(async () => {
  setOptions({
    key: config.public.googleMapsApiKey,
  })

  const { Map } = await importLibrary('maps')

  if (!mapRef.value) return

  const map = new Map(mapRef.value, {
    center: { lat: 25.6866, lng: -100.3161 },
    zoom: 12,
    mapId: '5151d965b1bfd283ce52f239',
  })

  const { AdvancedMarkerElement } = await importLibrary('marker')

  new AdvancedMarkerElement({
    map,
    position: { lat: 25.6866, lng: -100.3161 },
  })
})
</script>
<template>
  <div ref="mapRef" class="w-full h-full roundex-xl shadow"></div>
</template>
