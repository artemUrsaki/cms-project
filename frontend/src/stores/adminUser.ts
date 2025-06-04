import { defineStore } from "pinia";
import axiosInstance from "@/axios";
import { reactive, ref } from "vue";
import type { User } from "@/types/types";

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
      const { data } = await axiosInstance.get("/users");
      users.value = data;
    } catch (e) {
    } finally {
      fetching.value = false;
    }
  }

  async function fetchRoles() {
    try {
      const { data } = await axiosInstance.get("/roles");
      roles.value = data;
    } catch (e) {
    } finally {
      loadingUser.value = false;
    }
  }

  async function create() {
    loadingUser.value = true;
    try {
      await axiosInstance.post("/users", user);
    } catch (e) {
    } finally {
      loadingUser.value = false;
    }
  }

  async function update() {
    loadingUser.value = true;
    try {
      await axiosInstance.put(`/users/${userId.value}`, user);
    } catch (e) {
    } finally {
      loadingUser.value = false;
    }
  }

  async function destroy(id: number) {
    loadingUser.value = true;
    try {
      await axiosInstance.delete(`/users/${id}`);
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
