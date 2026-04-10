<script setup lang="ts">
import LabelInput from '~/components/common/LabelInput.vue'
import MapLeaflet from '~/components/app/Map.vue'
import type { RoutePoint, RoutePointType } from '~/types/route.type'
import LocationIcon from '~/components/common/icons/LocationIcon.vue'
import WaterIcon from '~/components/common/icons/WaterIcon.vue'
import FlagIcon from '~/components/common/icons/FlagIcon.vue'
import CheckpointIcon from '~/components/common/icons/CheckpointIcon.vue'

const mapRef = ref<InstanceType<typeof MapLeaflet> | null>(null)

// Estado del formulario
const formData = ref({
  name: '',
  description: '',
  mileage_km: 0,
  mileage_miles: 0,
  company: '',
  routePoints: [] as RoutePoint[],
})

// Control de creación de ruta
const isCreatingRoute = ref(false)
const selectedPointType = ref<RoutePointType>('checkpoint')

// Toggle para activar/desactivar modo de creación de ruta
const toggleRouteCreation = () => {
  isCreatingRoute.value = !isCreatingRoute.value
}

// Manejar click en el mapa
const handleMapClick = (event: any) => {
  console.log('Click en el mapa detectado', {
    event,
    isCreatingRoute: isCreatingRoute.value,
  })
  if (!isCreatingRoute.value) return
  if (!event.latlng) return // Ignorar clicks que no son del mapa

  const { lat, lng } = event.latlng
  console.log('Agregando punto:', { lat, lng, type: selectedPointType.value })

  const newPoint: RoutePoint = {
    lat,
    lng,
    type: selectedPointType.value,
    order: formData.value.routePoints.length + 1,
  }

  formData.value.routePoints.push(newPoint)
  console.log(
    'Punto agregado, total de puntos:',
    formData.value.routePoints.length
  )
}

// Configurar listener de click en el mapa cuando esté montado
onMounted(() => {
  nextTick(() => {
    if (mapRef.value?.mapRef?.leafletObject) {
      const leafletMap = mapRef.value.mapRef.leafletObject
      leafletMap.on('click', handleMapClick)
      console.log('Listener de click agregado al mapa')
    } else {
      console.error('No se pudo acceder al objeto de Leaflet')
    }
  })
})

onUnmounted(() => {
  if (mapRef.value?.mapRef?.leafletObject) {
    const leafletMap = mapRef.value.mapRef.leafletObject
    leafletMap.off('click', handleMapClick)
  }
})

// Eliminar último punto
const removeLastPoint = () => {
  formData.value.routePoints.pop()
}

// Limpiar toda la ruta
const clearRoute = () => {
  formData.value.routePoints = []
}

// Obtener color según tipo de punto
const getMarkerColor = (type: RoutePointType) => {
  const colors = {
    start: '#22c55e',
    water: '#3b82f6',
    checkpoint: '#f59e0b',
    finish: '#ef4444',
  }
  return colors[type]
}

// Coordenadas para la polilínea
const polylineCoords = computed(() => {
  return formData.value.routePoints.map(
    (p) => [p.lat, p.lng] as [number, number]
  )
})

const saveEvent = () => {
  // Aquí iría la lógica para enviar formData al backend
  console.log('Guardando evento con datos:', formData.value)
  alert('Evento guardado (simulado)')
}
</script>

<template>
  <div class="w-full h-full grid grid-cols-[450px_1fr]">
    <div
      class="border-gray-500 bg-bg-card p-4 text-white grid grid-cols-12 content-start gap-4 overflow-y-auto"
    >
      <LabelInput
        class="col-span-12"
        id="event-name"
        label="Nombre del evento"
        type="text"
        placeholder="Ingrese el nombre del evento"
        v-model="formData.name"
      />
      <LabelInput
        class="col-span-12"
        id="event-description"
        label="Descripción del evento"
        type="textarea"
        placeholder="Ingrese la descripción del evento"
        :rows="5"
        v-model="formData.description"
      />
      <LabelInput
        class="col-span-6"
        id="event-mileage"
        label="Kilómetros"
        type="number"
        placeholder="Ingrese los kilómetros"
        v-model="formData.mileage_km"
      />
      <LabelInput
        class="col-span-6"
        id="event-miles"
        label="Millas"
        type="number"
        placeholder="Ingrese las millas"
        v-model="formData.mileage_miles"
      />
      <LabelInput
        class="col-span-12"
        id="event-company"
        label="Empresa"
        type="text"
        placeholder="Ingrese el nombre de la empresa"
        v-model="formData.company"
      />

      <div class="col-span-12 mx-auto">
        <button
          class="bg-primary text-secondary px-10 rounded-sm py-2"
          @click="saveEvent"
        >
          Guardar Evento
        </button>
      </div>

      <!-- Sección de explicación para crear ruta -->
      <div class="col-span-12 mt-4 border-t border-gray-600 pt-4">
        <h3 class="text-lg font-semibold mb-3">Cómo crear la ruta</h3>
        <div class="text-sm text-gray-300 space-y-2">
          <p class="flex items-start gap-2">
            <span class="font-semibold text-white">1.</span>
            <span
              >Activa el modo de creación de ruta con el botón "Iniciar
              Ruta"</span
            >
          </p>
          <p class="flex items-start gap-2">
            <span class="font-semibold text-white">2.</span>
            <span>Selecciona el tipo de punto que quieres agregar:</span>
          </p>
          <div class="ml-6 space-y-1.5">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
              <span><strong>Inicio:</strong> Punto de partida</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-blue-500"></div>
              <span><strong>Agua:</strong> Estación de hidratación</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-amber-500"></div>
              <span
                ><strong>Punto de control:</strong> Checkpoint intermedio</span
              >
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <span><strong>Meta:</strong> Punto final</span>
            </div>
          </div>
          <p class="flex items-start gap-2">
            <span class="font-semibold text-white">3.</span>
            <span
              >Haz clic en el mapa para agregar puntos. La ruta se dibujará
              automáticamente</span
            >
          </p>
        </div>

        <!-- Controles de ruta -->
        <div class="mt-4 space-y-2">
          <button
            @click="toggleRouteCreation"
            :class="[
              'w-full py-2 px-4 rounded font-medium transition-colors',
              isCreatingRoute
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white',
            ]"
          >
            {{ isCreatingRoute ? 'Detener Ruta' : 'Iniciar Ruta' }}
          </button>

          <div class="flex gap-2">
            <button
              @click="removeLastPoint"
              :disabled="formData.routePoints.length === 0"
              class="flex-1 py-2 px-4 rounded font-medium bg-gray-700 hover:bg-gray-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Eliminar Último
            </button>
            <button
              @click="clearRoute"
              :disabled="formData.routePoints.length === 0"
              class="flex-1 py-2 px-4 rounded font-medium bg-gray-700 hover:bg-gray-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Limpiar Todo
            </button>
          </div>

          <p class="text-sm text-gray-400">
            Puntos en la ruta:
            <span class="font-semibold text-white">{{
              formData.routePoints.length
            }}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Mapa con controles flotantes y elementos de Leaflet -->
    <div class="relative">
      <!-- Botones flotantes para seleccionar tipo de punto -->
      <div
        v-if="isCreatingRoute"
        class="absolute top-4 left-4 z-[1000] bg-bg-card p-3 rounded-lg shadow-lg flex gap-2"
      >
        <button
          @click.stop="selectedPointType = 'start'"
          :class="[
            'p-2 rounded transition-all',
            selectedPointType === 'start'
              ? 'bg-green-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600',
          ]"
          title="Punto de inicio"
        >
          <LocationIcon class="w-5 h-5" />
        </button>
        <button
          @click.stop="selectedPointType = 'water'"
          :class="[
            'p-2 rounded transition-all',
            selectedPointType === 'water'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600',
          ]"
          title="Punto de agua"
        >
          <WaterIcon class="w-5 h-5" />
        </button>
        <button
          @click.stop="selectedPointType = 'checkpoint'"
          :class="[
            'p-2 rounded transition-all',
            selectedPointType === 'checkpoint'
              ? 'bg-amber-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600',
          ]"
          title="Punto de control"
        >
          <CheckpointIcon class="w-5 h-5" />
        </button>
        <button
          @click.stop="selectedPointType = 'finish'"
          :class="[
            'p-2 rounded transition-all',
            selectedPointType === 'finish'
              ? 'bg-red-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600',
          ]"
          title="Punto final"
        >
          <FlagIcon class="w-5 h-5" />
        </button>
      </div>

      <MapLeaflet ref="mapRef">
        <!-- Ruta trazada -->
        <LPolyline
          v-if="polylineCoords.length > 1"
          :lat-lngs="polylineCoords"
          :color="'#8b5cf6'"
          :weight="4"
          :opacity="0.8"
        />

        <!-- Marcadores de puntos -->
        <LCircleMarker
          v-for="(point, index) in formData.routePoints"
          :key="index"
          :lat-lng="[point.lat, point.lng]"
          :radius="8"
          :color="getMarkerColor(point.type)"
          :fillColor="getMarkerColor(point.type)"
          :fillOpacity="0.8"
        >
          <LTooltip>
            <div class="text-sm">
              <p class="font-semibold">
                {{
                  point.type === 'start'
                    ? 'Inicio'
                    : point.type === 'water'
                      ? 'Agua'
                      : point.type === 'finish'
                        ? 'Meta'
                        : `Punto ${index + 1}`
                }}
              </p>
              <p class="text-xs text-gray-400">
                {{ point.lat.toFixed(5) }}, {{ point.lng.toFixed(5) }}
              </p>
            </div>
          </LTooltip>
        </LCircleMarker>
      </MapLeaflet>
    </div>
  </div>
</template>
