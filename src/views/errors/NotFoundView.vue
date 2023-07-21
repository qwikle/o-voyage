<script setup lang="ts">
import taken from '@/assets/undraw/taken.svg'
</script>
<template>
  <article class="flex flex-col justify-center items-center w-full gap-10 p-10">
    <h1 class="text-4xl font-bold">404</h1>
    <p class="font-semibold text-lg">Désolé la page demandée n'existe pas</p>
    <img :src="taken" alt="soucoupe volante" />
    <RouterLink to="/" class="btn btn-base btn-lg">Retourner sur terre</RouterLink>
  </article>
</template>
<style scoped></style>
