<script lang="ts" setup>
import type { Event } from '~/types/event.type'
import MapIcon from '../common/MapIcon.vue'

interface Props {
  event: Event
}

const props = defineProps<Props>()
const dayjs = useDayjs()

const dayEvent = computed(() => dayjs(props.event.date).format('DD'))
const monthEvent = computed(() => dayjs(props.event.date).format('MMM'))
</script>
<template>
  <div
    class="w-full shadow-2xl rounded-2xl bg-bg-card border-2 hover:border-secondary"
  >
    <div class="h-25 relative">
      <img
        :src="event.image"
        class="h-full w-full object-cover rounded-t-2xl mask-[linear-gradient(to_bottom,var(--color-primary)_60%,transparent_100%)]"
      />
      <div
        class="border border-text flex flex-col justify-between rounded-md absolute bottom-2 left-2 px-2 py-1 bg-black text-white font-semibold"
      >
        <span class="text-center text-[13px] font-bold">{{ dayEvent }}</span>
        <span class="uppercase text-center text-[11px] font-bold">{{
          monthEvent
        }}</span>
      </div>
    </div>
    <div class="px-3 flex flex-col gap-2">
      <h3 class="text-white font-semibold text-[14px] line-clamp-2">
        {{ event.description }}
      </h3>
      <div class="text-text flex gap-1 items-center text-[12px] font-semibold">
        <div class="h-4 w-4">
          <MapIcon name="route" />
        </div>
        <span>{{ event.km }}</span>
      </div>
      <div class="text-text flex gap-1 items-center text-[12px] font-semibold">
        <div class="h-4 w-4">
          <MapIcon name="location" />
        </div>
        <span>{{ event.location.name }}</span>
      </div>
      <div class="bg-gray-300 h-[.5px]"></div>
    </div>
    <div
      class="flex justify-between px-3 py-2 text-[12px] font-semibold items-center"
    >
      <div class="text-blue-500 h-6 w-6">
        <MapIcon name="facebook" />
      </div>
      <span class="text-text">Ver en FB</span>
    </div>
  </div>
</template>
