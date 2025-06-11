import { defineStore } from "pinia";
import axiosInstance from "@/axios";
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import type { User } from "@/types/types";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const route = useRoute();

  const user = ref<User | null>(JSON.parse(sessionStorage.getItem('user') || 'null'));
  const loading = ref(false);

  // Computed
  const isLoggedIn = computed(() => user.value !== null);
  const isAdmin = computed(() => user.value?.role === "admin");

  // Actions
  async function initAuth() {
    try {
      const res = await axiosInstance.get("/user");
      storeAuth(res.data);
    } catch (error) {
      console.error("Failed to initialize authentication:", error);
    }
  }

  async function login(userObj: { email: string; password: string }) {
    try {
      loading.value = true;
      await axiosInstance.get("/sanctum/csrf-cookie", {
        baseURL: 'http://localhost:8000',
      });
      const res = await axiosInstance.post("login", userObj);
      storeAuth(res.data);

      router.push((route.query?.redirect as string) ?? { name: "profile.details" });
    } catch (error) {
      console.error("Login failed:", error);
    }

    loading.value = false;
  }

  async function logout() {
    try {
      loading.value = true;
      await axiosInstance.post("logout");
      cleanAuth();
      router.push({ name: "login" });
    } catch (error) {
      console.error("Logout failed:", error);
    }

    loading.value = false;
  }

  async function request_password(email: string) {
    try {
      loading.value = true;
      await axiosInstance.post("forgot-password", { email: email });
    } catch (error) {
      console.error("Request password failed:", error);
    }

    loading.value = false;
  }

  async function reset_password(token: string, email: string, password: string, conf_password: string) {
    try {
      loading.value = true;
      await axiosInstance.post("reset-password",
        {
          token: token,
          email: email,
          password: password,
          password_confirmation: conf_password
        }
      );
    } catch (error) {
      console.error("Reset password failed:", error);
    }

    loading.value = false;
  }

  async function updateUserDetails(userData: { first_name: string; last_name: string; email: string }) {
    try {
      loading.value = true;
      const resp = await axiosInstance.put('/user/profile-information', userData);
      storeAuth(resp.data);
    } catch (error) {
      console.log("Error updating user details:", error);
    }

    loading.value = false;
  };

  async function updatePassword(passwordData: { current_password: string; password: string; password_confirmation: string }) {
    try {
      loading.value = true;
      await axiosInstance.put('/user/password', passwordData)
    } catch (error) {
      console.error("Error updating password:", error);
    }

    loading.value = false;
  };

  function storeAuth(data: User) {
    user.value = data;
    sessionStorage.setItem("user", JSON.stringify(data));
  }

  function cleanAuth() {
    user.value = null;
    sessionStorage.removeItem("user");
  }

  return {
    user,
    isLoggedIn,
    isAdmin,
    loading,
    initAuth,
    login,
    logout,
    request_password,
    reset_password,
    updateUserDetails,
    updatePassword,
    storeAuth,
    cleanAuth,
  };
});