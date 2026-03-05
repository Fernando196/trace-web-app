<script lang="ts" setup>
import type { PointExpression } from 'leaflet'

const center = ref<PointExpression>([27.4698, -99.528])
</script>
<template>
  <div class="w-full h-full bg-primary">
    <LMap
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
