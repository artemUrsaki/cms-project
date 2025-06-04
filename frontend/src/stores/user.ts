import { defineStore } from "pinia";
import axiosInstance from "@/axios";
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import type { User } from "@/types/types";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const route = useRoute();

  const user = ref<null | User>(null);

  const isLoggedIn = ref(false);
  const loading = ref(false);
  const loggingUser = ref(false);

  // Computed
  const isAdmin = computed(() => user.value?.role === "admin");

  // Actions
  async function initAuth() {
    try {
      const res = await axiosInstance.get("/user");
      user.value = res.data;
      isLoggedIn.value = true;
    } catch (error) {}
  }

  async function checkAuth() {
    try {
      loading.value = true;
      await axiosInstance.get("/user");
    } catch (error) {
        console.log(error);
    } finally {
      loading.value = false;
    }
  }

  async function login(userObj: { email: string; password: string }) {
    loggingUser.value = true;
    await axiosInstance.get("/sanctum/csrf-cookie", {
      baseURL: 'http://localhost:8000',
    });
    const res = await axiosInstance.post("login", userObj);

    user.value = res.data;
    isLoggedIn.value = true;

    router.push((route.query?.redirect as string) ?? { name: "profile" });
    loggingUser.value = false;
  }

  async function logout() {
    try {
      await axiosInstance.post("logout");
      
      cleanAuth();
      router.push({ name: "login" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  function cleanAuth() {
    isLoggedIn.value = false;
    user.value = null;
  }

  return {
    user,
    isLoggedIn,
    isAdmin,
    loading,
    loggingUser,
    initAuth,
    checkAuth,
    login,
    logout,
    cleanAuth
  };
});
