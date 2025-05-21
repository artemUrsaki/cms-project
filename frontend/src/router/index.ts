import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AdminRoutes from './admin'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegistrationView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/profile/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    ...AdminRoutes,
    {
      path: '/:pathMatch(.*)*', 
      redirect: {name: 'home'}
    },
  ],
})

router.beforeEach((to, from) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    return { 
      name: 'login',
      query: { redirect: to.fullPath }
    }
  } else if (to.meta.isAdmin && !userStore.isAdmin) {
    return { name: 'home' }
  }
})

export default router
