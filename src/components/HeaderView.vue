<script setup lang="ts">
import { Bars3BottomRightIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

const menus = ref([
  {
    label: 'Accueil',
    path: '/'
  },
  {
    label: 'Connexion',
    path: '/signin'
  },
  {
    label: 'Inscription',
    path: '/signup'
  }
])
</script>
<template>
  <header class="h-16 bg-slate-800 flex items-center justify-between px-5">
    <div class="flex items-center gap-x-4 text-white">
      <RouterLink to="/">
        <img
          src="../assets/logo-cloud.png"
          alt="logo ovoyage en forme de nuage"
          class="h-10 w-10 md:h-12 md:w-12"
        />
      </RouterLink>
      <nav class="hidden md:block">
        <ul class="flex gap-x-2">
          <li v-for="menu in menus" :key="menu.label">
            <RouterLink
              :to="menu.path"
              class="flex items-center h-8 px-2 rounded hover:bg-stone-500"
              active-class="bg-stone-500"
              >{{ menu.label }}</RouterLink
            >
          </li>
        </ul>
      </nav>
    </div>
    <div class="flex items-center gap-x-2">
      <button class="h-10 w-10 flex hover:rounded group">
        <Bars3BottomRightIcon
          class="text-white h-full w-full group-hover:bg-slate-500 rounded group-active:bg-slate-600 lg:hidden"
        />
      </button>
    </div>
  </header>
</template>

<style scoped></style>
