export const authRoutes = [
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
    path: '/account',
    name: 'Account',
    component: () => import('../views/AccountView.vue'),
    meta: {
      onlyGuest: false,
      requiresAuth: true
    }
  }
]
