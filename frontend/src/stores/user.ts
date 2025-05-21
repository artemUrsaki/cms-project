import { defineStore } from "pinia";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";

export const useUserStore = defineStore('user', () => {
  const router = useRouter();
  const route = useRoute();

  const name = ref(localStorage.getItem('userName') || '');
  const email = ref(localStorage.getItem('userEmail') || '');
  const role = ref(localStorage.getItem('userRole') || '');
  const isLoggedIn = ref(localStorage.getItem('isLoggedIn') || '');

  // Computed
  const isAdmin = computed(() => role.value === 'admin');

  // Actions
  async function initialize() {
    if (isLoggedIn.value) {
      try {
        const { data } = await axios.get('/api/user');
        name.value = data.name;
        email.value = data.email;
        role.value = data.role;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          clearAuth();
        }
      }
    }
  }

  async function login(userObj: { email: string; password: string }) {
    try {
      const { data } = await axios.post('login', userObj);
      
      name.value = data.name;
      email.value = data.email;
      role.value = data.role;
      isLoggedIn.value = 'true';
      
      saveToStorage();
      router.push(route.query?.redirect as string ?? { name: 'profile' });
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw for component handling
    }
  }

  async function logout() {
    try {
      await axios.post('logout');
      clearAuth();
      router.push({ name: 'login' });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  function saveToStorage() {
    localStorage.setItem('userName', name.value);
    localStorage.setItem('userEmail', email.value);
    localStorage.setItem('userRole', role.value);
    localStorage.setItem('isLoggedIn', isLoggedIn.value);
  }

  function clearAuth() {
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    name.value = '';
    email.value = '';
    role.value = '';
    isLoggedIn.value = '';
  }

  return {
    name,
    email,
    role,
    isLoggedIn,
    isAdmin,
    initialize,
    login,
    logout,
    saveToStorage,
    clearAuth
  };
});