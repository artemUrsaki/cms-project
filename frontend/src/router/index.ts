import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminRoutes from "./admin";
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/LoginView.vue"),
    },
    {
      path: "/profile",
      component: () => import("@/views/profile/ProfileView.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: { name: 'profile-details' }
        },
        {
          path: '/details',
          name: 'profile-details',
          component: () => import("@/views/profile/partials/ProfileDetails.vue"),

        },
        {
          path: '/settings',
          name: 'profile-settings',
          component: () => import("@/views/profile/partials/ProfileSettings.vue"),
        }
      ],
    },
    {
      path: "/password-request",
      name: "password-request",
      component: () => import("@/views/profile/PassRequestView.vue"),
    },
    {
      path: "/password-reset",
      name: "password-reset",
      component: () => import("@/views/profile/PassResetView.vue"),
    },
    ...AdminRoutes,
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "home" },
    },
  ],
});

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth) {
    await userStore.checkAuth();

    if (!userStore.isLoggedIn) {
      return {
        name: "login",
        query: { redirect: to.fullPath },
      };
    }
  }

  if (to.meta.isAdmin && !userStore.isAdmin) {
    return { name: "home" };
  }
});

export default router;
