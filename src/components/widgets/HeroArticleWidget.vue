<script setup lang="ts">
defineProps({
  title: String,
  description: String,
  image: String,
  imageAlt: String,
  bgColor: {
    type: String,
    default: 'bg-orange-200'
  },
  bgArticle: {
    type: String,
    default: 'bg-orange-100'
  },
  imagePosition: {
    type: String,
    default: 'left'
  }
})
</script>
<template>
  <article class="hero" :class="bgArticle">
    <div
      class="hero-content flex-col"
      :class="{
        'lg:flex-row-reverse': imagePosition === 'right',
        'lg:flex-row': imagePosition === 'left'
      }"
    >
      <div class="rounded-xl shadow-lg h-40 lg:h-auto" :class="bgColor">
        <img :src="image" :alt="imageAlt" class="h-full" />
      </div>
      <div class="flex flex-col px-10 gap-y-6">
        <h2 class="text-2xl lg:text-4xl font-bold">{{ title }}</h2>
        <p class="text-gray-700 font-semibold text-sm lg:text-base">
          {{ description }}
        </p>
      </div>
    </div>
  </article>
</template>
<style scoped></style>
