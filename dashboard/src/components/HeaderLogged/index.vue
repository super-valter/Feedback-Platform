<template>
  <div class="sm:flex items-center justify-between w-4/5 max-w-6xl sm:py-10 py-5">
    <!-- <div class="sm:flex items-center justify-between pt-10"> -->
    <div class="w-full flex justify-center mb-3 sm:w-36 sm:flex-initial sm:mb-0">
      <img
        src="../../assets/images/logo_white 1.png"
        alt="Logo Feedback"
        titulo="Logo Feedback"
        class="sm:m-auto"
      >
    </div>
    <nav class="flex justify-center">
      <ul class="sm:flex list-none">
        <li
          @click="() => router.push('/credencials')"
          class="px-6 py-2 font-bold text-white rounded-full cursor-pointer focus:outline-nome content-center flex items-center"
        >
          Credenciais
        </li>
        <li
          @click="() => router.push('/feedbacks')"
          class="px-6 py-2 font-bold text-white rounded-full cursor-pointer focus:outline-nome  flex items-center"
        >
          Feedbacks
        </li>
        <li
          @click="handleLogout"
          class="px-6 py-2 font-bold bg-white text-brand-main text-center rounded-full cursor-pointer focus:outline-nome w-full"
        >
          {{ logoutLabel }}
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import useStore from '@/hooks/useStore'
import { computed } from "vue";
import { cleanCurrentUser } from "@/store/user";

 const router = useRouter()
const store = useStore('User')

const logoutLabel = computed(() => {
  if (!store.currentUser.name) {
    return '....'
  }
return `${store.currentUser.name} (sair)`
})

const handleLogout = () => {
  window.localStorage.removeItem('token')
  cleanCurrentUser()
  router.push('/')
}

</script>
