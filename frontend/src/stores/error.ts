import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import type { Error } from "@/types/types";
import axios from "axios";
import { useRouter } from "vue-router";

export const useErrorStore = defineStore("error", () => {
    const router = useRouter();

  const errors: Error = reactive({});
  const isError = ref(false);

  async function withErrorHandling(fn: () => any) {
    isError.value = false;
    try {
      await fn();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return router.push({ name: "login" });
      }
      throwErrors(error);
    }
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

  return {
    errors,
    isError,
    withErrorHandling,
    throwErrors,
  };
});
