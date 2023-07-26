export const travelRoutes = [
  {
    path: '/trips',
    name: 'Trips',
    component: () => import('../views/trips/TripsView.vue'),
    meta: {
      onlyGuest: false,
      requiresAuth: true
    }
  },
  {
    // regex must match slug format slug ending with a number
    path: '/trips/:slug([\\w+-]+-\\d+)',
    name: 'Trip',
    component: () => import('../views/trips/TripView.vue'),
    meta: {
      onlyGuest: false,
      requiresAuth: true
    },
    beforeEnter: async (to: { params: { slug: string } }) => {
      const { useTravelStore } = await import('@/stores/travel.store')
      await useTravelStore().getTravelBySlug(to.params.slug as string)
      if (!useTravelStore().travel) {
        return { name: 'NotFound' }
      }
    },
    children: [
      {
        path: ':date(\\d{4}-\\d{2}-\\d{2})',
        name: 'TripDate',
        component: () => import('../views/trips/TripDateView.vue'),
        meta: {
          onlyGuest: false,
          requiresAuth: true
        },
        beforeEnter: async (to: { params: { slug: string; date: string } }) => {
          const { useTravelStore } = await import('@/stores/travel.store')
          const { getListOfDatesFromTwoDates } = await import('@/utils/functions')
          await useTravelStore().getTravelBySlug(to.params.slug as string)
          const travel = useTravelStore().travel!
          const dates = getListOfDatesFromTwoDates(travel.departureDate, travel.arrivalDate)
          const exists = dates.find((date) => date.value === to.params.date)
          if (!exists) {
            return { name: 'NotFound' }
          }
        }
      }
    ]
  }
]
