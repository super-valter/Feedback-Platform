<template>
  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      <slot />
    </h1>
    <p class="text-le text-center text-gray-800 font-regular">
      <slot name="description" />
    </p>
  </div>
</template>
