<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-600">
      Entre na sua conta
    </h1>
    <button
      @click="closeModal"
      class="text-4xl text-gray-600 focus:outline-none"
    >
      &times;
    </button>
  </div>
  <div class="mt-10">
    <form
      @submit.prevent="onSubmit"
    >
      <label class="block mt-6">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          type="email"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{
            'border-brand-danger': !!state.email.errorMessage}
          "
          v-model="state.email.value"
          placeholder="ex.: joao@joao.com.br"
        >
        <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-6">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          type="text"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{
            'border-brand-danger': !!state.password.errorMessage}
          "
          v-model="state.password.value"
          placeholder="e.g., ***********"
        >
        <span
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>
      <button
        :disabled="state.isLoading"
        type="submit"
        :class="{
          'opacity-50': state.isLoading
        }"
        class="px-10 py-2 mt-10 text-md  text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
      >
        <Icon
          v-if="state.isLoading"
          name="loading"
          class="animate-spin"
        />
        <span v-else>
          Entrar
        </span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter  } from "vue-router";

import { useField,  } from 'vee-validate'
 import { useToast } from "vue-toastification";

import useModal from "@/hooks/useModal";
import Icon from "../Icon/"
import { validateEmptyAndLength3, validateEmptyAndEmail } from '@/utils/validators'
import services from "@/services";


const router = useRouter()
const modal = useModal()
const toast = useToast()

const { value: emailValue, errorMessage: emailErrorMessage } = useField('email', validateEmptyAndEmail)
const { value: passwordValue, errorMessage: passwordErrorMessage } = useField('passaword', validateEmptyAndLength3)

const state = reactive({
  hasErros: false,
  isLoading: false,
  email: {
    value: emailValue,
    errorMessage: emailErrorMessage
  },
  password: {
    value: passwordValue,
    errorMessage: passwordErrorMessage
  },
})

const closeModal = () => {
  modal.close()
}

const onSubmit = async () => {
  try {
    toast.clear()
    state.isLoading = true
    const { data, errors } = await services.auth.login({
      email: state.email.value,
      password: state.password.value
    })

    if (!errors) {
          window.localStorage.setItem('token', data.token)
          router.push('/feedbacks')
          state.isLoading = false
          modal.close()
          return
        }

    if (errors.status === 400) {
      toast.error('Ocorreu um erro ao fazer o login, favor tentar mais tarde.')
    }
    if (errors.status === 401) {
      toast.error('E-mail ou senha inválidos.')
    }
    if (errors.status === 404) {
      toast.error('E-mail ou senha não encontrado.')
    }
    state.isLoading = false

  } catch (error) {
    toast.error('Ocorreu um erro ao fazer o login, favor tentar mais tarde.')
    state.isLoading = false
    state.hasErros = !!error
  }
}
</script>
