<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
<template>
  <section class="flex flex-col items-center py-4 mt-10 rounded gap-y-4">
    <h1 class="font-semibold text-2xl">{{ title }}</h1>
    <slot></slot>
  </section>
</template>
<style scoped></style>
