import travelService from '@/services/travel/travel.service'
import { defineStore } from 'pinia'
import type { Travel, TravelInput } from '@/models'

export const useTravelStore = defineStore('travel', {
  state: () => ({
    travels: [] as Travel[]
  }),
  actions: {
    async getTravels() {
      this.travels = await travelService.getTravelList()
    },
    async createTravel(travelForm: TravelInput) {
      travelForm.organizerId = this.$auth.user?.id
      try {
        const travel = await travelService.createTravel(travelForm)
        this.travels.push(travel)
        this.$alert.showAlert({
          message: 'Le voyage a bien été créé',
          type: 'success'
        })
      } catch (error) {
        this.$alert.showAlert({
          // @ts-ignore
          message: error.message,
          type: 'error'
        })
      }
    }
  }
})
