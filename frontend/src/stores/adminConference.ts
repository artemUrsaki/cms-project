import { defineStore } from "pinia"
import { ref } from "vue"
import axiosInstance from "@/axios"
import type { Conference } from "@/types/types"

interface ConferenceInput {
  name: string
  year: number
  editors: string[]
}

export const useAdminConferenceStore = defineStore("adminConference", () => {
  const conferences = ref<Conference[]>([])
  const availableEditors = ref<string[]>([])
  const fetching = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const conferenceModal = ref(false)
  const editingConference = ref<Conference | null>(null)

  async function fetch() {
    fetching.value = true
    try {
      const res = await axiosInstance.get("/conferences")
      conferences.value = res.data
    } catch (err: any) {
      error.value = err.message
    } finally {
      fetching.value = false
    }
  }

  async function fetchEditors() {
    try {
      const res = await axiosInstance.get("/conference-editors")
      availableEditors.value = res.data
    } catch (err: any) {
      error.value = err.message
    }
  }

  async function create(data: ConferenceInput) {
    loading.value = true
    try {
      const res = await axiosInstance.post("/conferences", data)
      conferences.value.push(res.data)
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function update(id: number, data: ConferenceInput) {
    loading.value = true
    try {
      const res = await axiosInstance.put(`/conferences/${id}`, data)
      const index = conferences.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        conferences.value[index] = res.data
      }
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function remove(id: number) {
    try {
      axiosInstance.delete(`/conferences/${id}`)
      conferences.value = conferences.value.filter((c) => c.id !== id)
    } catch (err: any) {
      error.value = err.message
    }
  }

  function toggleModal(conference: Conference | null = null) {
    editingConference.value = conference
    conferenceModal.value = !conferenceModal.value
  }

  return {
    conferences,
    availableEditors,
    loading,
    fetching,
    error,
    conferenceModal,
    editingConference,
    fetch,
    fetchEditors,
    create,
    update,
    remove,
    toggleModal,
  }
})
