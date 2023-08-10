<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import undrawActivity from '@/assets/undraw/activities.svg'
import DialogComponent from '@/components/DialogComponent.vue'
import ActivityFormWidget from '@/components/widgets/forms/ActivityFormWidget.vue'
import { useRoute } from 'vue-router'
import { useTravelStore } from '@/stores/travel.store'
import { DateTime } from 'luxon'
import { useActivityStore } from '@/stores/activity.store'
import TimelineWidget from '@/components/widgets/TimelineWidget.vue'

const route = useRoute()
const travel = useTravelStore().travel!
const activityStore = useActivityStore()
const isOpen = ref(false)
function setIsOpen(value: boolean) {
  isOpen.value = value
}
const isDisabled = computed(() => {
  const date = DateTime.now().toFormat('yyyy-MM-dd')
  return date > DateTime.fromISO(route.params.date as string).toFormat('yyyy-MM-dd')
})
const activities = computed(() => {
  const allActivities = activityStore.activities
  return allActivities.sort((a, b) => {
    return a.time > b.time ? 1 : -1
  })
})

onMounted(() => {
  activityStore.getActivities(route.params.date as string)
})

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
      <TimelineWidget :activities="activities" v-if="activities.length" />
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
