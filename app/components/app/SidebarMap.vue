<script setup lang="ts">
import CardEvent from '../app/CardEvent.vue'

const racesStore = useEventStore()
const { events } = storeToRefs(racesStore)

onMounted(() => {
  racesStore.getRaces()
})
</script>
<template>
  <aside
    class="row-span-2 h-full overflow-auto flex flex-col w-118 border-r border-r-text"
  >
    <div class="pl-5 py-3">
      <h1 class="text-xl text-white font-semibold">EVENTOS</h1>
    </div>
    <div class="grid grid-cols-2 justify-center gap-5 px-5">
      <CardEvent v-for="event in events" :event="event" />
    </div>
  </aside>
</template>
