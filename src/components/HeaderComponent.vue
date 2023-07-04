<script setup lang="ts">
import { Bars3BottomRightIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

const menus = computed(() => {
  if (authStore.isAuthenticated) {
    return [
      {
        label: 'Mes voyages',
        path: '/trips'
      },
      {
        label: 'Mon compte',
        path: '/account'
      },
      {
        label: 'Déconnexion',
        path: '/signout'
      }
    ]
  }
  return [
    {
      label: 'Connexion',
      path: '/signin'
    },
    {
      label: 'Inscription',
      path: '/signup'
    }
  ]
})
</script>
<template>
  <header class="h-14 bg-slate-800 flex items-center justify-between px-5">
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
            <button
              v-if="menu.path === '/signout'"
              @click="authStore.signOut"
              class="flex items-center py-1 px-2 rounded hover:bg-white hover:text-slate-800"
            >
              {{ menu.label }}
            </button>
            <RouterLink
              v-else
              :to="menu.path"
              class="flex items-center py-1 px-2 rounded hover:bg-white hover:text-slate-800"
              active-class="bg-white text-slate-800"
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
