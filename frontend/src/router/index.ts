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
      component: () => import("@/layouts/ProfileLayout.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: { name: 'profile.details' }
        },
        {
          path: '/details',
          name: 'profile.details',
          component: () => import("@/views/profile/ProfileDetails.vue"),

        },
        {
          path: '/settings',
          name: 'profile.settings',
          component: () => import("@/views/profile/ProfileSettings.vue"),
        }
      ],
    },
    {
      path: "/password-request",
      name: "password-request",
      component: () => import("@/views/profile/PasswordRequestView.vue"),
    },
    {
      path: "/password-reset",
      name: "password-reset",
      component: () => import("@/views/profile/PasswordResetView.vue"),
    },
    ...AdminRoutes,
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "home" },
    },
  ],
});

router.beforeEach((to, from) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    return {
      name: "login",
      query: { redirect: to.fullPath },
    };
  } else if (to.meta.requiresAdmin && !userStore.isAdmin) {
    return { name: "home" };
  } else if (to.name === "login" && userStore.isLoggedIn) {
    return { name: "profile.details" };
  }
});

export default router;
