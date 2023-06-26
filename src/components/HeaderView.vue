<script setup lang="ts">
import { Bars3BottomRightIcon } from '@heroicons/vue/24/outline'
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
        <ul>
          <li><RouterLink to="/signin">Connexion</RouterLink></li>
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
