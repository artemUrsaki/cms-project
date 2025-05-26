import { defineStore } from "pinia";
import axios from "axios";
import { reactive, ref } from "vue";
import type { User, Error } from "@/types/types";
import { useRouter } from "vue-router";

export const useAdminUserStore = defineStore("adminUser", () => {
  const router = useRouter();

  const users = ref([] as User[]);
  const roles = ref([] as string[]);
  const userModal = ref(false);

  const user = reactive({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
  });

  const userId = ref(-1);
  const errors: Error = reactive({});
  const isError = ref(false);

  async function withErrorHandling(fn: () => any) {
    isError.value = false;
    try {
      return await fn();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return router.push({ name: "login" });
      }
      
      isError.value = true;
      throwErrors(error);
    }
  }

  async function fetch() {
    return withErrorHandling(async () => {
      const { data } = await axios.get("api/users");
      users.value = data;
    });
  }

  async function fetchRoles() {
    return withErrorHandling(async () => {
      const { data } = await axios.get("api/roles");
      roles.value = data;
    });
  }

  async function create() {
    return withErrorHandling(async () => {
      await axios.post("api/users", user);
    });
  }

  async function edit(id: number) {
    return withErrorHandling(async () => {
      const { data } = await axios.get(`api/users/${id}`);
      userId.value = id;
      user.first_name = data.first_name;
      user.last_name = data.last_name;
      user.email = data.email;
      user.role = data.role;
    });
  }

  async function update() {
    return withErrorHandling(async () => {
      await axios.put(`api/users/${userId.value}`, user);
    });
  }

  async function destroy(id: number) {
    return withErrorHandling(async () => {
      await axios.delete(`api/users/${id}`);
    });
  }

  function throwErrors(error: any) {
    Object.keys(errors).forEach((key) => delete errors[key]); // clear previous errors

    isError.value = true;
    if (error.response && error.response.status === 422) {
      Object.assign(errors, error.response.data.errors);
    } else {
      console.log(error);
    }
  }

  function toggleModal() {
    userModal.value = !userModal.value;
  }

  return {
    users,
    roles,
    userModal,
    user,
    userId,
    errors,
    isError,
    fetch,
    fetchRoles,
    create,
    edit,
    update,
    destroy,
    toggleModal,
    throwErrors,
  };
});
