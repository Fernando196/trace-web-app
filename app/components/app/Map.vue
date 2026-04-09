<script lang="ts" setup>
import { type PointExpression } from 'leaflet'
import type { LMap } from '~/types/leaftlet.type'

const center = ref<PointExpression>([27.4698, -99.528])
const mapRef = ref<LMap | null>(null)

const centerMapOnBounds = (coords: [number, number][]) => {
  if (mapRef.value && mapRef.value?.leafletObject) {
    const map = mapRef.value.leafletObject
    map.fitBounds(coords, {
      padding: [50, 50],
      animate: true,
      duration: 1.5,
    })
  }
}

defineExpose({
  centerMapOnBounds,
  mapRef,
})
</script>
<template>
  <div class="w-full h-full bg-primary">
    <LMap
      ref="mapRef"
      :zoom="13"
      :center="center"
      class="h-full w-full"
      :use-global-leaflet="false"
    >
      <LTileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <slot />
    </LMap>
  </div>
</template>
