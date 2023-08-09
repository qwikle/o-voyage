<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import undrawActivity from '@/assets/undraw/activities.svg'
import DialogComponent from '@/components/DialogComponent.vue'
import ActivityFormWidget from '@/components/widgets/forms/ActivityFormWidget.vue'
import { useRoute } from 'vue-router'
import { useTravelStore } from '@/stores/travel.store'
import { DateTime } from 'luxon'
import { useActivityStore } from '@/stores/activity.store'
import { useCategoryStore } from '@/stores/category.store'
import { ArrowDownIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
const route = useRoute()
const travel = useTravelStore().travel!
const activityStore = useActivityStore()
const categoryStore = useCategoryStore()
const isOpen = ref(false)
function setIsOpen(value: boolean) {
  isOpen.value = value
}
const isDisabled = computed(() => {
  const date = DateTime.now()
  return date > DateTime.fromISO(route.params.date as string)
})
const activities = computed(() => activityStore.activities)

onMounted(() => {
  activityStore.getActivities(route.params.date as string)
})

function getActivityCategory(id: number) {
  return categoryStore.categories.find((category) => category.id === id)?.name
}

watch(
  () => route.params.date,
  () => {
    if (route.params.date) {
      activityStore.getActivities(route.params.date as string)
    }
  }
)
</script>
<template>
  <div class="my-4">
    <div class="flex gap-y-2 flex-col items-center w-full">
      <button
        @click="setIsOpen(true)"
        class="btn btn-primary btn-sm self-end"
        :disabled="isDisabled"
      >
        Ajouter un évènement
      </button>
      <div
        class="flex flex-col p-6 items-center gap-y-6 lg:gap-x-4 lg:flex-row w-full lg:flex-wrap"
        v-if="activities.length"
      >
        <article
          v-for="(activity, index) in activities"
          :key="activity.id"
          class="bg-blue-100 p-4 w-96 h-44 rounded-md shadow-md relative"
        >
          <h2 class="font-bold text-lg">{{ getActivityCategory(activity.categoryId) }}</h2>
          <p>{{ activity.time }}</p>
          <ArrowRightIcon
            v-if="index + 1 !== activities.length"
            class="absolute top-20 -right-4 w-6 h-6 text-emerald-500 hidden lg:block"
          />
          <ArrowDownIcon
            v-if="index + 1 !== activities.length"
            class="absolute -bottom-5 right-1/2 w-6 h-6 text-emerald-500 lg:hidden"
          />
        </article>
      </div>
      <div class="flex flex-col items-center" v-else>
        <img :src="undrawActivity" alt="activities svg" class="w-full md:w-1/2" />
        <h4 class="text-sm font-semibold italic md:text-lg">
          Vous n'avez aucune activités de prévue pour cette date
        </h4>
      </div>
    </div>
    <DialogComponent :show="isOpen" title="Créer un évènement" @close="setIsOpen">
      <ActivityFormWidget
        :initialDate="(route.params.date as string)"
        :travel="travel"
        @close="setIsOpen"
      />
    </DialogComponent>
  </div>
</template>
<style scoped></style>
