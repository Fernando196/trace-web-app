<script setup lang="ts">
import MapIcon from '~/components/common/MapIcon.vue'
import type { Event } from '~/types/event.type'

interface Props {
  event: Event
}

defineProps<Props>()

// const showTooltip = ref<boolean>(false)
</script>
<template>
  <LMarker :lat-lng="event.location.coordinates">
    <LIcon
      :icon-size="[40, 40]"
      :icon-anchor="[16, 16]"
      class-name="bg-transparent relative"
    >
      <div
        class="rounded-full px-2 py-2.5 bg-blue-400 flex justify-center items-center border-secondary border"
      >
        <MapIcon name="runner" class="w-5 text-secondary" />
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
/* 1. Quitar el fondo blanco y la sombra del contenedor original */
.trace-custom-popup .leaflet-popup-content-wrapper {
  background: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  border: none !important;
}

/* 2. Quitar la flechita blanca de abajo (o personalizarla) */
.trace-custom-popup .leaflet-popup-tip-container {
  display: none !important; /* La ocultamos para un look más moderno */
}

/* 3. Quitar el botón de cerrar (la X blanca) */
.trace-custom-popup .leaflet-popup-close-button {
  display: none !important;
}

/* 4. Resetear el margen interno que Leaflet le pone al contenido */
.trace-custom-popup .leaflet-popup-content {
  margin: 0 !important;
  width: auto !important;
}
</style>
