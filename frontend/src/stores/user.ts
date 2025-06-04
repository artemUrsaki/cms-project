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

  // --- New State for Profile Details Form (moved from ProfileSettings.vue) ---
  // These will be bound to the input fields in the component
  const editedFirstName = ref(user.value?.first_name || '');
  const editedLastName = ref(user.value?.last_name || '');
  const editedEmail = ref(user.value?.email || '');

  // State for feedback messages for profile details
  const profileMessage = ref('');
  const profileError = ref('');

  // --- New State for Password Change Form (moved from ProfileSettings.vue) ---
  const currentPassword = ref('');
  const newPassword = ref('');
  const confirmNewPassword = ref('');

  // State for feedback messages for password changes
  const passwordMessage = ref('');
  const passwordError = ref('');

  // Computed
  const isAdmin = computed(() => user.value?.role === "admin");

  // Actions
  async function initAuth() {
    try {
      const res = await axiosInstance.get("/user");
      user.value = res.data;
      isLoggedIn.value = true;
      
      // Initialize edited fields when user data is loaded
      editedFirstName.value = user.value?.first_name || '';
      editedLastName.value = user.value?.last_name || '';
      editedEmail.value = user.value?.email || '';

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
    // Initialize edited fields on login
    editedFirstName.value = user.value?.first_name || '';
    editedLastName.value = user.value?.last_name || '';
    editedEmail.value = user.value?.email || '';

    router.push((route.query?.redirect as string) ?? { name: "profile-details" });
    loggingUser.value = false;
  }

  async function logout() {
    try {
      await axios.post("logout");

      // Clear edited fields on logout
      editedFirstName.value = '';
      editedLastName.value = '';
      editedEmail.value = '';
      currentPassword.value = '';
      newPassword.value = '';
      confirmNewPassword.value = '';
      profileMessage.value = '';
      profileError.value = '';
      passwordMessage.value = '';
      passwordError.value = '';

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
  
  function cleanAuth() {
    isLoggedIn.value = false;
    user.value = null;
  }

  // --- New Actions for Profile Details ---
  async function saveUserDetailsChanges() {
    profileMessage.value = '';
    profileError.value = '';

    try {
      await axios.put('/user/profile-information', {
        first_name: editedFirstName.value,
        last_name: editedLastName.value,
        email: editedEmail.value,
      });

      profileMessage.value = 'Profile details updated successfully!';

      // Update the user data directly in the store after successful update
      if (user.value) {
        user.value.first_name = editedFirstName.value;
        user.value.last_name = editedLastName.value;
        user.value.email = editedEmail.value;
      }

    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.errors) {
        profileError.value = Object.values(error.response.data.errors).flat().join('\n');
      } else {
        profileError.value = 'An unexpected error occurred while updating profile.';
      }
      console.error('Error saving profile details:', error);
    }
  };

  // --- New Actions for Password Changes ---
  async function savePasswordChanges() {
    passwordMessage.value = '';
    passwordError.value = '';

    // Frontend validation: Check if new password and confirmation match
    if (newPassword.value !== confirmNewPassword.value) {
      passwordError.value = "New password and confirmation don't match!";
      return;
    }

    try {
      await axios.put('/user/password', {
        current_password: currentPassword.value,
        password: newPassword.value,
        password_confirmation: confirmNewPassword.value,
      });

      passwordMessage.value = 'Password updated successfully!';

      // Clear the form fields on successful update
      currentPassword.value = '';
      newPassword.value = '';
      confirmNewPassword.value = '';

    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.errors) {
        // Fortify's validation errors for passwords are typically under the 'updatePassword' bag
        passwordError.value = Object.values(error.response.data.errors).flat().join('\n');
      } else {
        passwordError.value = 'An unexpected error occurred while changing password.';
      }
      console.error('Error saving password changes:', error);
    }
  };

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

    // New state and actions for profile details
    editedFirstName,
    editedLastName,
    editedEmail,
    profileMessage,
    profileError,
    saveUserDetailsChanges,

    // New state and actions for password changes
    currentPassword,
    newPassword,
    confirmNewPassword,
    passwordMessage,
    passwordError,
    savePasswordChanges,
    cleanAuth
  };
});