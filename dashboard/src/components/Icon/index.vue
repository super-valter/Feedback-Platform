<template>
  <component
    :is="state.iconComponent"
    v-bind="$props"
  />
</template>

<script setup>
import { defineAsyncComponent, onMounted, reactive } from 'vue'

const Loading = defineAsyncComponent(() => import('./Loading.vue'))
const Copy = defineAsyncComponent(() => import('./Copy.vue'))
const ChevronDown = defineAsyncComponent(() => import('./ChevronDown.vue'))

const iconProps = defineProps({
  name: {
    type: [Number, String],
    required: true
  }
});

const state = reactive({
  iconComponent: null
})

const listIcon = {
  'loading': Object.freeze(Loading),
  'copy': Object.freeze(Copy),
  'chevron-down': Object.freeze(ChevronDown),
}

onMounted(() => {
  state.iconComponent = listIcon[iconProps.name]
});

</script>

