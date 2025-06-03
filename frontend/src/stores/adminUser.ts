import { defineStore } from "pinia";
import axios from "axios";
import { reactive, ref } from "vue";
import type { User, Error } from "@/types/types";
import { useErrorStore } from "./error";

export const useAdminUserStore = defineStore("adminUser", () => {
  const errorStore = useErrorStore();

  const users = ref<User[]>([]);
  const roles = ref<string[]>([]);
  const userModal = ref(false);
  const fetching = ref(false);
  const loadingUser = ref(false);

  const user = reactive({
    first_name: "",
    last_name: "",
    email: "",
    role: "editor",
  });

  const userId = ref(-1);

  async function fetch() {
    await errorStore.withErrorHandling(async () => {
      fetching.value = true;
      const { data } = await axios.get("api/users");
      users.value = data;
    });
    fetching.value = false;
  }

  async function fetchRoles() {
    return errorStore.withErrorHandling(async () => {
      const { data } = await axios.get("api/roles");
      roles.value = data;
    });
  }

  async function create() {
    await errorStore.withErrorHandling(async () => {
      loadingUser.value = true;
      await axios.post("api/users", user);
    });
    loadingUser.value = false;
  }

  async function edit(id: number) {
    await errorStore.withErrorHandling(async () => {
      loadingUser.value = true;
      const { data } = await axios.get(`api/users/${id}`);
      userId.value = id;
      user.first_name = data.first_name;
      user.last_name = data.last_name;
      user.email = data.email;
      user.role = data.role;
    });
    loadingUser.value = false;
  }

  async function update() {
    await errorStore.withErrorHandling(async () => {
      loadingUser.value = true;
      await axios.put(`api/users/${userId.value}`, user);
    });
    loadingUser.value = false;
  }

  async function destroy(id: number) {
    return errorStore.withErrorHandling(async () => {
      await axios.delete(`api/users/${id}`);
    });
  }

  function toggleModal() {
    userModal.value = !userModal.value;
  }

  return {
    users,
    roles,
    userModal,
    fetching,
    loadingUser,
    user,
    userId,
    fetch,
    fetchRoles,
    create,
    edit,
    update,
    destroy,
    toggleModal,
  };
});
