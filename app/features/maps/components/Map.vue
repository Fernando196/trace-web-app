<script lang="ts" setup>
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
      <LMarker :lat-lng="center">
        <LIcon>
          <div class="relative flex items-center justify-center">
            <div
              class="absolute animate-ping h-8 w-8 rounded-full bg-[#b6e56e] opacity-30"
            ></div>
            <div
              class="h-6 w-6 rounded-full bg-[#b6e56e] border-2 border-[#0b151e] flex items-center justify-center"
            >
              <span class="text-[10px] font-bold text-[#0b151e]">T</span>
            </div>
          </div>
        </LIcon>
      </LMarker>
    </LMap>
  </div>
</template>
