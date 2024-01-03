<template>
  <head class="flex justify-center w-full sm:h-28 bg-brand-main">
    <header-logged />
  </head>

  <title-page>
    Feedbacks
    <template #description>
      Detalhes de todos os feedbacks recebidos.
    </template>
  </title-page>


  <section class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2">
      <div>
        <h2 class="text-3xl font-black text-brand-darkgray">
          Listagem
        </h2>
        <filters
          v-show="!state.isloading"
          @select-label="changeFeedbacksType"
          @is-loading="handleFilterLoading"
          class="mt-8 animate__animated animate__fadeIn animate__faster"
        />
        <div v-if="state.isloading">
          <filters-loading />
        </div>
      </div>
      <div class="px-10 pt-20 col-span-3">
        <p
          v-if="state.hasError"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Aconteceu um erro ao carregar os feedbacks 🥺
        </p>
        <p
          v-if="!state.feedbacks.length && !state.isLoading && !state.isLoadingFeedbacks && !state.hasError"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Ainda nenhum feedback recebido 🥺
        </p>

        <feedback-card-loading v-if="state.isloading || state.isLoadingFeedbacks" />
        <feedback-card
          v-else
          v-for="(feedback, index) in state.feedbacks"
          :key="feedback.id"
          :is-opened="index === 0"
          :feedback="feedback"
        />
        <feedback-card-loading v-if="state.isLoadingMoreFeedback" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onErrorCaptured, onMounted, onUnmounted, reactive } from 'vue';

import HeaderLogged from '@/components/HeaderLogged'
import TitlePage from '@/components/TitlePage'
import FeedbackCard from '@/components/FeedbackCard'
import FeedbackCardLoading from '@/components/FeedbackCard/Loading'

import Filters from './Filters.vue';
import FiltersLoading from './FiltersLoading';
import services from '@/services';

const state = reactive({
  isloading: false,
  hasError: false,
  isLoadingFeedbacks: false,
  currentFeedbackType: '',
  isLoadingMoreFeedback: false,
  pagination:{
    limit: 5,
    offset: 0
  },
  feedbacks: []
})

const handleErrors = (error) => {
  state.isloading = false
  state.isLoadingFeedbacks = false
  state.hasError = !!error
  state.isLoadingMoreFeedback = false
}

const changeFeedbacksType = async (type) => {
  try {
    if (type === 'all') {
      return fetchFeedbacks()
    }
    state.isLoadingFeedbacks = true
    state.pagination.offset = 0
    state.pagination.limit = 5
    state.changeFeedbacksType = type

    const { data } = await services.feedbacks.getAll({
      type,
      ...state.pagination
    })

    state.feedbacks = data.results
    state.pagination = data.pagination
    state.isLoadingFeedbacks = false
  } catch (error) {
    handleErrors(error)
  }
}

const handleFilterLoading = (loding) => {
  state.isloading = loding
}

const fetchFeedbacks = async () => {
  try {
    state.isloading = true
    const { data } = await services.feedbacks.getAll({
      ...state.pagination,
      type: state.currentFeedbackType
    })

    state.feedbacks = data.results
    state.pagination = data.pagination
    state.isloading = false
  } catch (error) {
    handleErrors(error)
  }
}

const handleScroll = async () => {
  const isBottomOfWindow = Math.ceil( document.documentElement.scrollTop + window.innerHeight) >= document.documentElement.scrollHeight

  if (state.isloading || state.isLoadingMoreFeedback) return
  if(!isBottomOfWindow) return
  if (state.feedbacks.length >= state.pagination.total) return
  try {
    state.isLoadingMoreFeedback = true
    const { data } = await services.feedbacks.getAll({
      ...state.pagination,
      type: state.currentFeedbackType,
      offset: (state.pagination.offset + 5)
    })

    if (data.results.length) {
      state.feedbacks.push(...data.results)
    }

    state.isLoadingMoreFeedback = false
    state.pagination = data.pagination

  } catch (error) {
    state.isLoadingMoreFeedback = false
    handleErrors(error)
  }
}

onMounted(() => {
  fetchFeedbacks()
  window.addEventListener('scroll', handleScroll, false)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, false)
})

onErrorCaptured(handleErrors)
</script>
