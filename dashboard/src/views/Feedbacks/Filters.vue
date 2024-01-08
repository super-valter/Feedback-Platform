<template>
  <div class="flex flex-col">
    <h3 class="text-2xl font-regular text-brand-graydark">
      Filtros
    </h3>
    <ul class="flex flex-col mt-3 list-none">
      <li
        v-for="filter in state.filters"
        :key="filter.label"
        :class="{'bg-gray-200 bg-opacity-50' : filter.active}"
        @click="() => handleSelectLabel(filter.type)"
        class="flex items-center justify-between px-4 py-1 rounded cursor-pointer"
      >
        <div class="flex items-center">
          <span
            :class="filter.color?.bg"
            class="inline-block w-2 h-2 mr-2 rounded-full"
          />{{ filter.label }}
        </div>
        <span
          :class="filter.active ? `${filter.color?.text}` : 'text-brand-graydark'"
          class="font-bold"
        >
          {{ filter.amount }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import services from '@/services'
import useStore from '@/hooks/useStore'

const emits = defineEmits(['selectLabel', 'isLoading']);

const LABELS = {
  all: 'Todos',
  issue: 'Problemas',
  idea: 'Ideias',
  other: 'Outros'
}

const LABELS_COLORS = {
  all: { text: 'text-brand-info', bg: 'bg-brand-info' },
  issue: { text: 'text-brand-danger', bg: 'bg-brand-danger' },
  idea: { text: 'text-brand-warning', bg: 'bg-brand-warning' },
  other: { text: 'text-brand-graydark', bg: 'bg-brand-graydark' }
}

const store = useStore('Global')
const state = reactive({
  hasError: false,
  filters: [{
    label: null, amount: null
  }]
})

const applyFiltersStructure = (summary) => {
  return Object.keys(summary).reduce((acc, cur) => {
    const currentFilter = {
      label: LABELS[cur],
      color: LABELS_COLORS[cur],
      amount: summary[cur]
    }

    cur === 'all' ? currentFilter.active = true : currentFilter.type = cur

    return [...acc, currentFilter]
  }, [])

}


const handleSelectLabel = ( type ) => {
  if (store.isLonding) return

  state.filters = state.filters.map((filter) => {
    if (filter.type === type) {
      return { ...filter, active: true}
    }
    return { ...filter, active: false}
  })

  emits('selectLabel', type)
}


onMounted(async () => {
  emits('isLoading', true)
  try {
    const { data } = await services.feedbacks.getSummary()
    state.filters = applyFiltersStructure(data)
    emits('isLoading', false)
  } catch (error) {
    state.hasError = !!error
    state.filters = applyFiltersStructure({all: 0, issue: 0, idea: 0, other: 0})
    emits('isLoading', false)
  }
});
</script>
