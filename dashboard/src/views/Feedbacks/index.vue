<template>
  <div>
    <h1>{{ user }}</h1>
  </div>
</template>

<script setup>
import User from "@/store/user";

const user = User
</script>

