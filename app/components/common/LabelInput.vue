<script setup lang="ts">
import type { Icons } from './MapIcon.vue'
import MapIcon from './MapIcon.vue'

interface Props {
  id: string
  label: string
  type: string
  placeholder?: string
  rows?: number
  disabled?: boolean
  iconName?: Icons
}
defineProps<Props>()
const selectedValue = defineModel<number | string | null>({ default: null })

const emits = defineEmits(['setItemRef', 'click'])
</script>
<template>
  <div
    class="input-wrapper"
    :ref="(el) => emits('setItemRef', el)"
    @click="$emit('click')"
  >
    <label class="input-label" v-if="label ? true : false">
      {{ label }}
    </label>
    <div class="input-container">
      <input
        :id="id"
        :placeholder="placeholder"
        :type="type"
        v-model="selectedValue"
        :disabled="disabled"
        v-if="type !== 'textarea'"
      />
      <textarea
        :id="id"
        :placeholder="placeholder"
        v-model="selectedValue"
        v-if="type === 'textarea'"
        :rows="rows || 10"
      ></textarea>
      <div class="input-icon" v-if="iconName">
        <div class="input-icon-svg">
          <MapIcon :name="iconName" />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
@reference 'tailwindcss';
.input-wrapper {
  @apply relative flex w-full flex-col text-sm;
}
.input-wrapper .input-label {
  @apply h-6;
}
.input-container {
  @apply relative w-full cursor-pointer rounded-md border border-gray-400 focus:outline-none;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 3px 6px,
    rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
.input-container input,
textarea {
  @apply flex h-full w-full items-center pl-2 focus:outline-none;
}
.input-container input {
  @apply h-8;
}
.input-container textarea {
  @apply resize-none;
}
.input-container .input-icon {
  @apply absolute top-1 right-2 flex items-center;
}
.input-container .input-icon-svg {
  @apply h-5 w-5 text-gray-400;
}
</style>
