<script setup lang="ts">
import departing from '@/assets/undraw/departing.svg'
</script>
<template>
  <figure class="mx-auto pt-10 w-full relative lg:w-1/2">
    <figcaption class="absolute text-xs top-24 lg:text-lg font-bold italic lg:top-28 left-0">
      Vous n'avez pas encore de voyage
    </figcaption>
    <img :src="departing" alt="" class="" />
  </figure>
</template>
<style scoped></style>
