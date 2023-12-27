<template>
  <header class="header bg-brand-main">
    <div class="header-group h-auto">
      <div class="sm:flex items-center justify-between sm:pt-10 pt-5">
        <div class="w-full flex justify-center mb-3 sm:w-36 sm:flex-initial sm:mb-0">
          <img
            src="../../assets/images/logo_white 1.png"
            alt="Logo Feedback"
            titulo="Logo Feedback"
            class="sm:m-auto"
          >
        </div>
        <div class="flex justify-center">
          <button
            @click="() => emit('create-acconut')"
            class="px-6 py-2 font-bold rounded-full text-white focus:outline-none"
          >
            Crie uma conta
          </button>
          <button
            @click="() => emit('login')"
            class="px-6 py-2 font-bold bg-white rounded-full text-brand-main focus:outline-none"
          >
            Entrar
          </button>
        </div>
      </div>
      <div class="flex flex-grow items-center">
        <div>
          <h1 class="text-4xl  font-black text-white">
            Tenha um feedback. <br>
            E faça seus clientes mais <br class="hidden lg:inline-block">
            felizes!
          </h1>
          <p class="text-lg font-medium text-white">
            Receba ideias, reclamações e feedbacks com um  <br class="hidden lg:inline-block">
            simples widget na página.
          </p>
          <div>
            <button class="px-6 py-2 mt-10 font-bold bg-white rounded-full text-brand-main focus:outline-none">
              Crie uma conta grátis
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default{
  setup (_, { emit }){

    return {emit}
  }
}
</script>

<style lang="postcss" scoped>
.header{
  @apply bg-brand-main w-full flex justify-center;
  min-height: 600px;
}
.header-group{
  @apply flex flex-col w-4/5 max-w-6xl;
}

@media (min-width: 640px) {
  .header{
    min-height: 700px;
  }
.header-group{
  background-image: url(
        ../../assets/images/blue-balloons.png);
        background-size: 370px;
        background-position: 90% 100%;
        background-repeat: no-repeat;
  }
}

</style>
