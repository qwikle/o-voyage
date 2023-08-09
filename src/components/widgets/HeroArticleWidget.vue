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
  <article class="hero xl:rounded-md" :class="bgArticle">
    <div
      class="hero-content flex-col"
      :class="{
        'lg:flex-row-reverse': imagePosition === 'right',
        'lg:flex-row': imagePosition === 'left'
      }"
    >
      <div class="rounded-xl shadow-lg flex justify-center items-center" :class="bgColor">
        <img :src="image" :alt="imageAlt" class="w-52 lg:max-w-xs" />
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
