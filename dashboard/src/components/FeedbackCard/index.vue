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
      class="flex mt-8 animate__animated animate__fadeInUp animate__faster"
    >
      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">PÁGINA</span>
          <span class="font-medium text-gray-700">{{ props.feedback.page }}</span>
        </div>
      </div>

      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">USUÁRIO</span>
          <span class="font-medium text-gray-700">{{ props.feedback.fingerprint }}</span>
        </div>
      </div>

      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">DISPOSITIVO</span>
          <span class="font-medium text-gray-700">{{ props.feedback.device }}</span>
        </div>
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
