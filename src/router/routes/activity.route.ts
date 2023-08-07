export const activityRoutes = [
  {
    path: ':date([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9])',
    name: 'TripDate',
    component: () => import('@/views/trips/activities/ActivityDateView.vue'),
    meta: {
      onlyGuest: false,
      requiresAuth: true
    },
    beforeEnter: async (to: { params: { slug: string; date: string } }) => {
      const { useTravelStore } = await import('@/stores/travel.store')
      const travel = useTravelStore().travel!
      const exists = travel.dateList.find((date) => date.value === to.params.date)
      if (!exists) {
        return { name: 'NotFound' }
      }
      const { useActivityStore } = await import('@/stores/activity.store')
      useActivityStore().getActivities(to.params.date as string)
    }
  }
]
