<template>
  <content-loader
    class="flex flex-col items-center rounded"
    width="100%"
    height="300px"
  >
    <content-loader
      class="flex flex-col items-center rounded"
      width="90%"
      height="90px"
      animation-duration="2s"
    />
    <content-loader
      class="flex flex-col items-center rounded"
      width="90%"
      height="90px"
      animation-duration="2.3s"
    />
    <content-loader
      class="flex flex-col items-center rounded"
      width="90%"
      height="90px"
      animation-duration="2.7s"
    />
  </content-loader>
</template>

<script setup>
import ContentLoader from '@/components/ContentLoader'
</script>
