import { defineStore } from "pinia";
import axiosInstance from "@/axios";
import { ref } from "vue";
import type { User } from "@/types/types";
import type { UserInput } from "@/types/types";

export const useAdminUserStore = defineStore("adminUser", () => {
  const users = ref<User[]>([]);
  const roles = ref<string[]>([]);
  const userModal = ref(false);
  const fetching = ref(false);
  const loadingUser = ref(false);

  const editingUser = ref<User | null>(null);

  async function fetch() {
    fetching.value = true;
    try {
      const res = await axiosInstance.get("/users");
      users.value = res.data;
    } catch (e) {
    } finally {
      fetching.value = false;
    }
  }

  async function fetchRoles() {
    try {
      const res = await axiosInstance.get("/roles");
      roles.value = res.data;
    } catch (e) {
    } finally {
      loadingUser.value = false;
    }
  }

  async function create(user: UserInput) {
    loadingUser.value = true;
    try {
      const res = await axiosInstance.post("/users", user);
      users.value.push(res.data);
    } catch (e) {
    } finally {
      loadingUser.value = false;
    }
  }

  async function update(id: number, user: UserInput) {
    loadingUser.value = true;
    try {
      const res = await axiosInstance.put(`/users/${id}`, user)
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index] = res.data
      }
    } catch (e) {
    } finally {
      loadingUser.value = false;
    }
  }

  async function destroy(id: number) {
    loadingUser.value = true;
    try {
      axiosInstance.delete(`/users/${id}`);
      users.value = users.value.filter(u => u.id !== id);
    } catch (e) {
    } finally {
      loadingUser.value = false;
    }
  }

  function toggleModal(user: User | null = null) {
    editingUser.value = user;
    userModal.value = !userModal.value;
  }

  return {
    users,
    roles,
    userModal,
    fetching,
    loadingUser,
    editingUser,
    fetch,
    fetchRoles,
    create,
    update,
    destroy,
    toggleModal,
  };
});
