import { activityRoutes } from './activity.route'

export const travelRoutes = [
  {
    path: '/trips',
    name: 'Trips',
    component: () => import('@/views/trips/TripsView.vue'),
    meta: {
      onlyGuest: false,
      requiresAuth: true
    },
    beforeEnter: async () => {
      const { useTravelStore } = await import('@/stores/travel.store')
      const { useCategoryStore } = await import('@/stores/category.store')
      await useTravelStore().getTravels()
      await useCategoryStore().getCategories()
    },
    children: [
      {
        path: '',
        name: 'TripList',
        component: () => import('@/views/trips/TripListView.vue')
      },
      {
        // regex must match slug format slug ending with a number
        path: ':slug([\\w+-]+-\\d+)',
        name: 'Trip',
        component: () => import('@/views/trips/TripView.vue'),
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
            path: '',
            name: 'TripOverview',
            component: () => import('@/views/trips/TripOverviewView.vue')
          },
          {
            path: 'settings',
            name: 'TripSettings',
            component: () => import('@/views/trips/TripSettingsView.vue')
          },
          {
            path: 'activities',
            name: 'TripActivities',
            component: () => import('@/views/trips/activities/ActivitiesView.vue'),
            children: [...activityRoutes]
          }
        ]
      }
    ]
  }
]
