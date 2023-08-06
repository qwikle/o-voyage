import { createRouter, createWebHistory } from 'vue-router'
import { isAuth } from './guards/auth'
import { authRoutes } from './routes/auth.route'
import { travelRoutes } from './routes/travel.route'

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
    ...authRoutes,
    ...travelRoutes,

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
      return { name: 'TripList' }
    }
  }
})

export default router
