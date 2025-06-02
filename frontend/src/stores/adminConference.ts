// src/stores/adminConference.ts
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAdminConferenceStore = defineStore('adminConference', {
  state: () => ({
    conferences: [] as any[],
    loading: false,
    error: null as string | null,
    conferenceModal: false,
    editingConference: null as any | null,
  }),

  actions: {
    async fetch() {
      this.loading = true
      try {
        const res = await axios.get('/api/conferences')
        this.conferences = res.data.map((conf: any) => ({
          ...conf,
          editors: conf.users.map((user: any) => user.email),
        }))
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async create(data: any) {
      const res = await axios.post('/api/conferences', data)
      this.conferences.push({
        ...res.data,
        editors: res.data.users.map((user: any) => user.email),
      })
    },

    async update(id: number, data: any) {
      const res = await axios.put(`/api/conferences/${id}`, data)
      const index = this.conferences.findIndex(c => c.id === id)
      if (index !== -1) {
        this.conferences[index] = {
          ...res.data,
          editors: res.data.users.map((user: any) => user.email),
        }
      }
    },

    async remove(id: number) {
      await axios.delete(`/api/conferences/${id}`)
      this.conferences = this.conferences.filter(c => c.id !== id)
    },

    toggleModal(conference: any | null = null) {
      this.conferenceModal = !this.conferenceModal
      this.editingConference = conference
    },
  },
})
