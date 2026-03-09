<script setup lang="ts">
import MapIcon from '~/components/common/MapIcon.vue'
import type { Event } from '~/types/event.type'

interface Props {
  event: Event
}

defineProps<Props>()

const markerRef = ref(undefined)
const emit = defineEmits(['click'])

const handleChangePopup = (open: boolean) => {
  if (markerRef.value && (markerRef.value as any).leafletObject) {
    if (open) {
      ;(markerRef.value as any).leafletObject.openPopup()
    } else {
      ;(markerRef.value as any).leafletObject.closePopup()
    }
  }
}

defineExpose({
  handleChangePopup,
})
</script>
<template>
  <LMarker
    :lat-lng="event.location.coordinates"
    @click="emit('click')"
    ref="markerRef"
  >
    <LIcon
      :icon-size="[40, 40]"
      :icon-anchor="[16, 16]"
      class-name="bg-transparent relative"
    >
      <div class="group relative flex flex-col items-center">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary border-2 border-secondary shadow-xl rotate-45 transition-all group-hover:rotate-0"
        >
          <div
            class="-rotate-45 group-hover:rotate-0 transition-all text-secondary"
          >
            <MapIcon name="runner" class="w-5" />
          </div>
        </div>
      </div>
    </LIcon>
    <LPopup
      :options="{
        className: 'trace-custom-popup',
        offset: [-100, -100],
        autoClose: false,
        closeOnClick: false,
      }"
    >
      <div class="absolute w-50 h-25 bg-primary p-2 rounded-2xl flex">
        <div class="w-22 overflow-hidden rounded-sm">
          <img :src="event.image" class="w-full h-full" />
        </div>
        <div
          class="-ml-2 flex-1 flex items-center relative text-white rounded-sm overflow-hidden"
        >
          <div class="absolute opacity-40 w-full h-full">
            <img :src="event.image" class="w-full h-full" />
          </div>
          <span class="z-10 pl-4">Carrera</span>
        </div>
      </div>
    </LPopup>
  </LMarker>
</template>
<style lang="css">
.trace-custom-popup .leaflet-popup-content-wrapper {
  background: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  border: none !important;
}

.trace-custom-popup .leaflet-popup-tip-container {
  display: none !important;
}

.trace-custom-popup .leaflet-popup-close-button {
  display: none !important;
}

.trace-custom-popup .leaflet-popup-content {
  margin: 0 !important;
  width: auto !important;
}
</style>
