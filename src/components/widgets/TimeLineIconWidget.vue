<script setup lang="ts">
import { useCategoryStore } from '@/stores/category.store'
import {
  MoonIcon,
  PaperAirplaneIcon,
  PuzzlePieceIcon,
  ShoppingCartIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  categoryId: {
    type: Number,
    required: true
  }
})

const categoryStore = useCategoryStore()

const category = categoryStore.categories.find((category) => category.id === props.categoryId)

function setActivityBackgroundColor() {
  switch (category?.name) {
    case 'Trajet':
      return 'bg-emerald-200'
    case 'Hébergement':
      return 'bg-rose-200'
    case 'Activité':
      return 'bg-blue-200'
    case 'Repas':
      return 'bg-yellow-200'
    default:
      return 'bg-green-400'
  }
}

function getIcon(category: string | undefined) {
  switch (category) {
    case 'Trajet':
      return PaperAirplaneIcon
    case 'Hébergement':
      return MoonIcon
    case 'Activité':
      return PuzzlePieceIcon
    case 'Repas':
      return ShoppingCartIcon
    default:
      return 'MoonIcon'
  }
}
</script>
<template>
  <div class="rounded w-1 self-center bg-gray-200">
    <div
      class="h-10 rounded-full w-10 self-center absolute top-1/3 -right-5 flex items-center justify-center"
      :class="setActivityBackgroundColor()"
    >
      <component :is="getIcon(category?.name)" class="h-6 w-6 text-slate-500" />
    </div>
  </div>
</template>
