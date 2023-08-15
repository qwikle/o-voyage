<script setup lang="ts">
import type { Activity } from '@/models'
import { useCategoryStore } from '@/stores/category.store'
import TimeLineIconWidget from '@/components/widgets/TimeLineIconWidget.vue'
defineProps({
  activities: {
    type: Array as () => Activity[],
    required: true
  }
})

const categoryStore = useCategoryStore()
function setActivityBackgroundColor(id: number) {
  const category = categoryStore.categories.find((category) => category.id === id)
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

function SetActivityLeftRight(index: number, id: number) {
  if (index % 2 === 0) {
    return 'md:self-start ' + setActivityBackgroundColor(id)
  } else {
    return 'md:self-end ' + setActivityBackgroundColor(id)
  }
}

function getActivityCategory(id: number) {
  return categoryStore.categories.find((category) => category.id === id)?.name
}
</script>
<template>
  <div class="flex flex-col py-6 px-12 lg:gap-x-4 w-full relative" v-if="activities.length">
    <div class="flex flex-col w-full" v-for="(activity, index) in activities" :key="activity.id">
      <TimeLineIconWidget :categoryId="activity.categoryId" class="h-24 relative md:hidden" />
      <article
        class="md:w-[45%] h-28 rounded flex flex-col gap-y-1 p-4"
        :class="SetActivityLeftRight(index, activity.categoryId)"
      >
        <h2 class="font-semibold text-lg">{{ activity.name }}</h2>
        <p>
          <span>{{ activity.time }}</span> - {{ getActivityCategory(activity.categoryId) }}
        </p>
        <p class="text-sm">{{ activity.members }} participants</p>
        <TimeLineIconWidget
          :categoryId="activity.categoryId"
          class="h-32 absolute right-1/2 hidden md:block"
        />
      </article>
    </div>
  </div>
</template>
