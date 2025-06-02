import { defineStore } from "pinia";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import type { User } from "@/types/types";
import { useErrorStore } from "./error";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const route = useRoute();
  const errorStore = useErrorStore();

  const user = ref<null | User>(null);

  const isLoggedIn = ref(false);
  const loading = ref(false);
  const loggingUser = ref(false);

  // Computed
  const isAdmin = computed(() => user.value?.role === "admin");

  // Actions
  async function initAuth() {
    try {
      const { data } = await axios.get("/api/user");

      isLoggedIn.value = true;
      user.value = data;
    } catch (error) {
      console.log(error);
    }
  }

  async function checkAuth() {
    try {
      loading.value = true;
      await axios.get("/api/user");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        isLoggedIn.value = false;
        user.value = null;
      } else {
        console.log(error);
      }
    } finally {
      loading.value = false;
    }
  }

  async function login(userObj: { email: string; password: string }) {
    await errorStore.withErrorHandling(async () => {
      loggingUser.value = true;
      await axios.get("sanctum/csrf-cookie");
      const { data } = await axios.post("login", userObj);

      user.value = data;
      isLoggedIn.value = true;

      router.push((route.query?.redirect as string) ?? { name: "profile" });
    });
    loggingUser.value = false;
  }

  async function logout() {
    try {
      await axios.post("logout");
      isLoggedIn.value = false;
      user.value = null;

      router.push({ name: "login" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  async function request_password(email: string) {
    try {
      console.log("Resetting password...");
      console.log("User email:", user.value?.email);
      await axios.post("forgot-password",
        {
          email: email
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
    } catch (error) {
      console.error("Request password failed:", error);
    }
  }

  async function reset_password(token: string, email: string, password: string, conf_password: string) {
    try {
      console.log(password);
      console.log(conf_password);
      console.log("Resetting password with token:", token);
      await axios.post("reset-password",
        {
          token: token,
          email: email,
          password: password,
          password_confirmation: conf_password
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
    } catch (error) {
      console.error("Reset password failed:", error);
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
