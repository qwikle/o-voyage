<script setup lang="ts">
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useRoute } from 'vue-router'
const route = useRoute()
const authStore = useAuthStore()

const isOpen = ref(false)

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
      path: route.query.redirect ? `/signin?redirect=${route.query.redirect}` : '/signin'
    },
    {
      label: 'Inscription',
      path: route.query.redirect ? `/signup?redirect=${route.query.redirect}` : '/signup'
    }
  ]
})

defineEmits(['isOpen', 'update:modelValue'])
</script>
<template>
  <header class="h-20 bg-slate-800 flex items-center justify-between px-5">
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
              aria-label="se déconnecter"
              v-if="menu.path === '/signout'"
              @click="authStore.signOut"
              class="flex items-center text-lg font-semibold py-1 px-2 rounded hover:bg-white hover:text-slate-800"
            >
              {{ menu.label }}
            </button>
            <RouterLink
              v-else
              :to="menu.path"
              class="flex items-center text-lg font-semibold py-1 px-2 rounded hover:bg-white hover:text-slate-800"
              exact-active-class="bg-white text-slate-800"
              >{{ menu.label }}</RouterLink
            >
          </li>
        </ul>
      </nav>
    </div>
    <div class="flex items-center gap-x-2">
      <label
        :aria-label="isOpen ? 'fermer le menu' : 'ouvrir le menu'"
        class="hover:bg-gray-600 rounded-full group md:hidden swap swap-rotate"
      >
        <input type="checkbox" v-model="isOpen" />
        <Bars3BottomRightIcon class="h-10 w-10 text-white swap-off" />
        <XMarkIcon class="h-10 w-10 text-white swap-on" />
      </label>
    </div>
  </header>
  <XyzTransition appear mode="out-in" xyz="up duration-2">
    <ul
      v-if="isOpen"
      class="w-full bg-slate-800 text-white flex flex-col px-4 pb-4 gap-y-3 md:hidden"
    >
      <li v-for="menu in menus" :key="menu.label" @click="isOpen = false">
        <button
          aria-label="se déconnecter"
          v-if="menu.path === '/signout'"
          @click="authStore.signOut"
          class="flex items-center text-lg font-semibold py-1 px-2 rounded hover:bg-white hover:text-slate-800"
        >
          {{ menu.label }}
        </button>
        <RouterLink
          v-else
          :to="menu.path"
          class="flex items-center text-lg font-semibold py-1 px-2 rounded hover:bg-white hover:text-slate-800"
          exact-active-class="bg-white text-slate-800"
          >{{ menu.label }}</RouterLink
        >
      </li>
    </ul>
  </XyzTransition>
</template>

<style scoped></style>
