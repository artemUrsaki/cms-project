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

  async function request_password(email: string) {
    try {
      console.log("Resetting password...");
      console.log("User email:", user.value?.email);
      await axiosInstance.post("forgot-password",
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
      await axiosInstance.post("reset-password",
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
    request_password,
    reset_password,
    cleanAuth
  };
});
