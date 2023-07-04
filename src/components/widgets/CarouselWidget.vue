<script setup lang="ts">
import { type PropType, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  images: {
    type: Array as PropType<
      {
        src: string
        alt: string
      }[]
    >,
    required: true
  }
})
let interval: number

onMounted(() => {
  const carousel = document.querySelector('.carousel')
  let slideIndex = 0
  interval = setInterval(() => {
    if (slideIndex === props.images.length - 1) {
      slideIndex = 1
      carousel?.scrollBy({
        top: 0,
        left: -900 * props.images.length,
        behavior: 'smooth'
      })
    } else {
      slideIndex++
      carousel?.scrollBy({
        top: 0,
        left: 300,
        behavior: 'smooth'
      })
    }
  }, 3500)
})
onUnmounted(() => {
  clearInterval(interval)
})
</script>
<template>
  <section class="carousel lg:w-1/2 max-h-96 rounded-box bg-base-300 mx-2 lg:mx-auto">
    <figure v-for="(image, index) in images" :key="index" class="carousel-item w-full">
      <img :src="image.src" :alt="image.alt" class="w-full object-cover" />
    </figure>
  </section>
</template>
<style scoped></style>
