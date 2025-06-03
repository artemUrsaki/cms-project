import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useAdminConferenceStore = defineStore("adminConference", () => {
  const conferences = ref<any[]>([]);
  const availableEditors = ref<string[]>([])
  const loading = ref(false);
  const error = ref<string | null>(null);
  const conferenceModal = ref(false);
  const editingConference = ref<any | null>(null);

  async function fetch() {
    loading.value = true;
    try {
      const res = await axios.get("/api/conferences");
      conferences.value = res.data.map((conf: any) => ({
        ...conf,
        editors: conf.users.map((user: any) => user.email),
      }));
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  async function fetchEditors() {
    try {
      const res = await axios.get("/api/editors");
      availableEditors.value = res.data.map((user: any) => user.email);
    } catch (err: any) {
      error.value = err.message;
    }
  }

  async function create(data: any) {
    loading.value = true;
    try {
      const res = await axios.post("/api/conferences", data);
      conferences.value.push({
        ...res.data,
        editors: res.data.users.map((user: any) => user.email),
      });
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  async function update(id: number, data: any) {
    loading.value = true;
    try {
      const res = await axios.put(`/api/conferences/${id}`, data);
      const index = conferences.value.findIndex((c) => c.id === id);
      if (index !== -1) {
        conferences.value[index] = {
          ...res.data,
          editors: res.data.users.map((user: any) => user.email),
        };
      }
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  async function remove(id: number) {
    loading.value = true;
    try {
      await axios.delete(`/api/conferences/${id}`);
      conferences.value = conferences.value.filter((c) => c.id !== id);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  function toggleModal(conference: any | null = null) {
    conferenceModal.value = !conferenceModal.value;
    editingConference.value = conference;
  }

  return {
    conferences,
    availableEditors,
    loading,
    error,
    conferenceModal,
    editingConference,
    fetch,
    fetchEditors,
    create,
    update,
    remove,
    toggleModal,
  };
});
