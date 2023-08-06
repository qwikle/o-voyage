<script setup lang="ts"></script>
<template>
  <RouterView v-slot="{ Component }">
    <XyzTransition appear mode="out-in" xyz="fade duration-3">
      <component :is="Component" />
    </XyzTransition>
  </RouterView>
</template>
<style scoped></style>
