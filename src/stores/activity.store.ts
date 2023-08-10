import { defineStore } from 'pinia'
import { Activity, type ActivityInput } from '@/models'
import activityService from '@/services/activity/activity.service'

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activities: [] as Activity[]
  }),
  actions: {
    getActivities(date: string) {
      this.activities = this.$travel.travel!.activities.filter((activity) => activity.date === date)
    },

    async createActivity(activityInput: ActivityInput) {
      const activity = await activityService.createActivity(activityInput)
      this.activities.push(activity)
      this.$travel.travel!.activities.push(activity)
    }
  }
})
