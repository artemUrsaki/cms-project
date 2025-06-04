import { defineStore } from "pinia";
import { ref} from "vue";
import type { Error } from "@/types/types";

export const useErrorStore = defineStore("error", () => {

  const errors = ref<Error | null>(null);

  function setValidationErrors(response: any) {
    errors.value = response.response.data.errors;
  }

  return {
    errors,
    setValidationErrors
  };
});
