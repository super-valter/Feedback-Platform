<template>
  <div class="flex flex-col h-screen">
    <CustomHeader
      @create-acconut="handleAccountCreate"
      @login="handleLogin"
    />
    <Contact />
    <footer class="flex justify-center py-10 bg-brand-gray">
      <p class="font-medium text-gray-800">
        feedbacker © {{ dataFormatada }}
      </p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Contact from './Contact.vue'
import CustomHeader from './CustomHeader.vue'
import useModal from "../../hooks/useModal";

const modal = useModal()

const dataFormatada = computed(() =>{
  const yearCurrent = new Date();
  return  yearCurrent.getFullYear()
})

const handleAccountCreate = () => {
   modal.open({
    component: 'ModalAccountCreate'
  })
}

const handleLogin = () =>{
  modal.open({
    component: 'ModalLogin'
  })
}

</script>
