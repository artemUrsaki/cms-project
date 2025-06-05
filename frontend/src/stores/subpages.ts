import { defineStore } from 'pinia';
import axios from 'axios';

export interface Subpage {
  id: number;
  title: string;
  content: string;
  conference_id: number;
}

export const useSubpageStore = defineStore('subpages', {
  state: () => ({
    subpages: [] as Subpage[],
    loading: false,
  }),

  actions: {
    async fetchSubpages() {
      this.loading = true;
      try {
        const res = await axios.get<Subpage[]>('/api/subpages');
        console.log("Fetched subpages:", res.data);
        this.subpages = res.data;
      } catch (error) {
        console.error("❌ Failed to fetch subpages:", error);
      } finally {
        this.loading = false;
      }
    },

    async addSubpage(data: { title: string; content: string; conference_id: number }) {
      try {
        // Optional: Validate before sending
        if (!data.title || !data.content || typeof data.conference_id !== 'number') {
          throw new Error("Missing required subpage fields.");
        }

        const res = await axios.post<Subpage>('/api/subpages', data);
        this.subpages.push(res.data);
      } catch (error) {
        console.error("❌ Failed to add subpage:", error);
        throw error;
      }
    },

    async updateSubpage(id: number, data: Partial<Omit<Subpage, 'id'>>) {
      try {
        const res = await axios.put<Subpage>(`/api/subpages/${id}`, data);
        const index = this.subpages.findIndex(s => s.id === id);
        if (index !== -1) this.subpages[index] = res.data;
      } catch (error) {
        console.error("❌ Failed to update subpage:", error);
        throw error;
      }
    },

    async deleteSubpage(id: number) {
      try {
        await axios.delete(`/api/subpages/${id}`);
        this.subpages = this.subpages.filter(s => s.id !== id);
      } catch (error) {
        console.error("❌ Failed to delete subpage:", error);
        throw error;
      }
    }
  }
});
