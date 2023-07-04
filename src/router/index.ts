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
        onlyGuest: false,
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
    }
  ]
})

router.beforeEach((to) => {
  const authenticated = isAuth()
  if (to.meta.requiresAuth) {
    if (!authenticated) {
      return { name: 'Signin' }
    }
  }
  if (to.meta.onlyGuest) {
    if (authenticated) {
      return { name: 'Home' }
    }
  }
})

export default router
