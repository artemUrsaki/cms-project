import { defineStore } from "pinia";
import { ref} from "vue";
import type { ValidationError } from "@/types/types";

export const useErrorStore = defineStore("error", () => {

  const errors = ref<ValidationError | null>(null);

  function setValidationErrors(response: any) {
    errors.value = response.response.data.errors;
  }

  function clearErrors() {
    errors.value = null;
  }

  return {
    errors,
    setValidationErrors,
    clearErrors
  };
});
