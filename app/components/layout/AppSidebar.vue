<script setup lang="ts">
const racesStore = useReacesStore()
const { races } = storeToRefs(racesStore)

onMounted(() => {
  racesStore.getRaces()
})
</script>
<template>
  <aside
    class="row-span-2 p-3 shadow-md border border-gray-100 rounded-xl bg-[#1F2937] h-full overflow-auto"
  >
    <ul class="space-y-3">
      <li
        v-for="race in races"
        :key="'card-run-' + race.id"
        class="bg-white rounded-xl border border-gray-100 p-3 flex items-start gap-3"
      >
        <div class="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <img
            :src="race.image"
            :alt="race.name"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div class="min-w-0 flex-1">
          <h3 class="text-base font-semibold text-gray-900 truncate">
            {{ race.name }}
          </h3>
          <span class="text-xs font-bold">{{ race.cityName }}</span>
          <p
            class="mt-1 text-sm text-gray-600 leading-5 max-h-16 overflow-hidden"
          >
            {{ race.description }}
          </p>
        </div>
      </li>
    </ul>
  </aside>
</template>
