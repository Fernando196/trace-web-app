<script setup lang="ts">
import LabelInput from '~/components/common/LabelInput.vue'
</script>

<template>
  <div class="w-full h-full flex justify-center items-center">
    <div
      class="border-gray-500 w-125 h-125 bg-bg-card rounded-lg p-4 text-white flex flex-col gap-4"
    >
      <LabelInput
        id="event-name"
        label="Nombre del evento"
        type="text"
        placeholder="Ingrese el nombre del evento"
      />
      <LabelInput
        id="event-description"
        label="Descripción del evento"
        type="textarea"
        placeholder="Ingrese la descripción del evento"
        :rows="5"
      />
    </div>
  </div>
</template>
