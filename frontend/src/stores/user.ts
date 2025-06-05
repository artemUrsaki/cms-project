import { defineStore } from "pinia";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import type { User } from "@/types/types";
import { useErrorStore } from "./error";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const route = useRoute();
  const errorStore = useErrorStore();

  const user = ref<null | User>(null);
  const isLoggedIn = ref(false);
  const loading = ref(false);
  const loggingUser = ref(false);

  const isAdmin = computed(() => user.value?.role === "admin");

  // Call this on app startup
  async function initAuth() {
    try {
      await axios.get("/sanctum/csrf-cookie");
      const { data } = await axios.get("/api/user");
      isLoggedIn.value = true;
      user.value = data;
    } catch (error) {
      console.error("initAuth failed:", error);
    }
  }

  async function checkAuth() {
    try {
      loading.value = true;
      await axios.get("/sanctum/csrf-cookie");
      const { data } = await axios.get("/api/user");
      user.value = data;
      isLoggedIn.value = true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        isLoggedIn.value = false;
        user.value = null;
      } else {
        console.error("checkAuth failed:", error);
      }
    } finally {
      loading.value = false;
    }
  }

  async function login(userObj: { email: string; password: string }) {
    await errorStore.withErrorHandling(async () => {
      loggingUser.value = true;
      await axios.get("/sanctum/csrf-cookie");
      const { data } = await axios.post("/login", userObj);

      user.value = data;
      isLoggedIn.value = true;

      router.push((route.query?.redirect as string) ?? { name: "profile" });
    });
    loggingUser.value = false;
  }

  async function logout() {
    try {
      await axios.post("/logout");
      isLoggedIn.value = false;
      user.value = null;
      router.push({ name: "login" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  async function request_password(email: string) {
    try {
      console.log("Requesting password reset for:", email);
      await axios.post(
        "/forgot-password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Password reset request failed:", error);
    }
  }

  async function reset_password(
    token: string,
    email: string,
    password: string,
    conf_password: string
  ) {
    try {
      console.log("Resetting password...");
      await axios.post(
        "/reset-password",
        {
          token,
          email,
          password,
          password_confirmation: conf_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Password reset failed:", error);
    }
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
    request_password,
    reset_password,
  };
});
