<template>
  <head class="flex justify-center w-full sm:h-28 bg-brand-main">
    <header-logged />
  </head>

  <title-page>
    Credenciais
    <template #description>
      Guia de instalação e geração de suas credenciais
    </template>
  </title-page>

  <section class="flex justify-center w-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h2 class="text-3xl font-black text-brand-darkgray">
        Instalação e configuração
      </h2>
      <!--  -->
      <p class="mt-10 tex-lg text-gray-800 font-regular">
        Este aqui é a sua chave de api
      </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="flex justify-between items-center py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-full lg:w-1/2"
      >
        <span v-if="state.hasError">
          Error ao carregaro script.
        </span>
        <span v-else>
          {{ store.User.currentUser.apiKey }}
        </span>
        <div
          class="flex ml-10 mr-1"
          v-if="!state.hasError"
        >
          <icon
            name="copy"
            size="24"
            class="cursor-pointer"
            :color="brandColors.graydark"
            @click="handleCopyApikey"
          />
          <icon
            name="loading"
            size="24"
            class="cursor-pointer ml-3"
            :color="brandColors.graydark"
            @click="handlerGenerateApikey"
          />
        </div>
      </div>
      <!--  -->
      <p class="mt-5 tex-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="mt-2 pt-2 mb-0 pb-0 rounded bg-brand-gray overflow-x-scroll w-full lg:w-4/5"
      >
        <span v-if="state.hasError">
          Error ao carregaro script.
        </span>
        <pre v-else>
            &lt;script src="super-valter-feedbacker-widget.netlify.app?api_key={{
            store.User.currentUser.apiKey
          }}"&gt;&lt;/script&gt;
          </pre>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useToast } from 'vue-toastification'

import HeaderLogged from '@/components/HeaderLogged'
import TitlePage from '@/components/TitlePage'
import Icon from '@/components/Icon'
import ContentLoader from '@/components/ContentLoader'

import useStore from '@/hooks/useStore'
import palette from '../../../palette'
import services from '@/services'
import { setApiKey } from '@/store/user'

const store = useStore()
const brandColors = palette.brand
const toast = useToast()

const state = reactive({
  isLoading: false,
  hasError: false
})

const handleError = (error) => {
  state.isLoading = false
  state.hasError = !!error
}

const handlerGenerateApikey = async () => {
  toast.clear()
  try {
    state.isLoading = true
    const {data} = await services.users.generateApiKey()
    setApiKey(data.apiKey)
    state.isLoading = false
  } catch (error) {
    handleError(error)
  }
}

const handleCopyApikey = async () => {
  try {
    await navigator.clipboard.writeText(store.User.currentUser.apiKey)
    toast.success('Copiado!')
  } catch (error) {
    handleError(error)
  }
}

watch(() => store.User.currentUser, () =>{
  if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
    handleError(true)
  }
})
</script>
