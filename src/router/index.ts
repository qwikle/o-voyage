import { createRouter, createWebHistory } from 'vue-router'
import { isAuth } from './guards/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        onlyGuest: true,
        requiresAuth: false
      }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/SignInView.vue'),
      meta: {
        onlyGuest: true,
        requiresAuth: false
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/SignUpView.vue'),
      meta: {
        onlyGuest: true,
        requiresAuth: false
      }
    },
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
      path: '/trips/:slug',
      name: 'Trip',
      component: () => import('../views/trips/TripView.vue'),
      meta: {
        onlyGuest: false,
        requiresAuth: true
      },
      beforeEnter: async (to) => {
        const { useTravelStore } = await import('@/stores/travel.store')
        await useTravelStore().getTravelBySlug(to.params.slug as string)
        if (!useTravelStore().travel) {
          return { name: 'NotFound' }
        }
      }
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import('../views/AccountView.vue'),
      meta: {
        onlyGuest: false,
        requiresAuth: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/errors/NotFoundView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const authenticated = await isAuth()
  if (to.meta.requiresAuth) {
    if (!authenticated) {
      return { name: 'Signin', query: { redirect: to.fullPath } }
    }
  }
  if (to.meta.onlyGuest) {
    if (authenticated) {
      return { name: 'Trips' }
    }
  }
})

export default router
