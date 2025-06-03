import { defineStore } from "pinia";
import axios from "axios";
import { reactive, ref } from "vue";
import type { User } from "@/types/types";
import { useErrorStore } from "./error";

export const useAdminUserStore = defineStore("adminUser", () => {
  const errorStore = useErrorStore();

  const users = ref([] as User[]);
  const roles = ref([] as string[]);
  const userModal = ref(false);
  const fetching = ref(false);
  const loadingUser = ref(false);

  const editingUser = ref<User | null>(null);

  async function fetch() {
    errorStore.withErrorHandling(async () => {
      fetching.value = true;
      const res = await axios.get("api/users");
      users.value = res.data;
    });
    fetching.value = false;
  }

  async function fetchRoles() {
    return errorStore.withErrorHandling(async () => {
      const res = await axios.get("api/roles");
      roles.value = res.data;
    });
  }

  async function create(user: any) {
    await errorStore.withErrorHandling(async () => {
      loadingUser.value = true;
      const res = await axios.post("api/users", user);
      users.value.push(res.data);
    });
    loadingUser.value = false;
  }

  async function update(id: number, user: any) {
    await errorStore.withErrorHandling(async () => {
      loadingUser.value = true;
      const res = await axios.put(`api/users/${id}`, user);
      const index = users.value.findIndex(u => u.id === id);
      if (index !== -1) {
        users.value[index] = res.data;
      }
    });
    loadingUser.value = false;
  }

  async function destroy(id: number) {
    return errorStore.withErrorHandling(async () => {
      axios.delete(`api/users/${id}`);
      users.value = users.value.filter(u => u.id !== id);
    });
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
