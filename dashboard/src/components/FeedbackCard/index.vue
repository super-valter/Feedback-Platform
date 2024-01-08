<template>
  <div
    @click="handleToggle"
    class="flex flex-col py-6 px-8 rounded cursor-pointer bg-brand-gray mb-8"
  >
    <div class="flex items-center justify-between w-full mb-8">
      <badge :type="props.feedback.type" />
      <span>
        {{ getDiffTimeBetweenCurrentDate(props.feedback.createdAt) }}
      </span>
    </div>

    <div class="text-lg font-medium text-gray-800">
      {{ props.feedback.text }}
    </div>

    <div
      v-if="state.isOpen"
      :class="{animate__fadeOutUp: state.isClosing}"
      class="grid grid-cols-4 gap-4 animate__animated animate__fadeInUp animate__faster"
    >
      <div class="col-span-4 md:col-span-2">
        <span class="font-black text-gray-400 uppercase select-none block">USUÁRIO</span>
        <span class="font-medium text-gray-700">{{ feedback.fingerprint }}</span>
      </div>
      <div class="col-span-4 md:col-span-2">
        <span class="font-black text-gray-400 uppercase select-none block">DISPOSITIVO</span>
        <span class="font-medium text-gray-700">{{ feedback.device }}</span>
      </div>
      <div class="col-span-4">
        <span class="font-black text-gray-400 uppercase select-none">PÁGINA</span>
        <p class="font-medium text-gray-700 text-ellipsis overflow-hidden">
          {{ feedback.page }}
        </p>
      </div>
    </div>

    <div
      v-if="!state.isOpen"
      class="flex justify-end mt-8"
    >
      <icon
        name="chevron-down"
        size="24"
        :color="brandColors.graydark"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

import Badge from '@/components/Badge';
import Icon from '@/components/Icon'

import { getDiffTimeBetweenCurrentDate } from '@/utils/date'
import palette from '../../../palette'
import { wait } from '@/utils/timeout';

const props = defineProps({
  feedback: { type: Object, required: true },
  isOpened: {type: Boolean, required: false}
})

const state = reactive({
  isOpen: props.isOpened,
  isClosing: !props.isOpened
})

const brandColors = palette.brand

const handleToggle = async () => {
  state.isClosing = true
  await wait(250)
  state.isOpen = !state.isOpen
  state.isClosing = false
}
</script>
