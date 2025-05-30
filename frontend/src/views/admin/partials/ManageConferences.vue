<template>
  <div class="border-b border-[#566d8b]/20 p-4 bg-white">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-semibold text-[#566d8b]">Conference Management</h1>
        <button
          @click="openAddModal"
          class="bg-[#fb6c11] text-white px-4 py-2 rounded-lg hover:bg-[#566d8b] transition-colors"
        >
          Add Conference
        </button>
      </div>
  </div>

    <div class="p-6">
      <div class="bg-white rounded-lg border border-[#566d8b]/20">
        <div class="p-4 border-b border-[#566d8b]/20">
          <input
            type="text"
            placeholder="Search conferences..."
            class="w-full px-4 py-2 border border-[#566d8b] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fb6c11] focus:border-[#fb6c11]"
            v-model="searchQuery"
          >
        </div>

        <table class="w-full">
          <thead class="bg-[#566d8b]/10">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-medium text-[#566d8b]">Name</th>
              <th class="px-6 py-3 text-left text-sm font-medium text-[#566d8b]">Year</th>
              <th class="px-6 py-3 text-left text-sm font-medium text-[#566d8b]">Editors</th>
              <th class="px-6 py-3 text-left text-sm font-medium text-[#566d8b]">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#566d8b]/10">
            <tr v-for="conference in filteredConferences" :key="conference.id">
              <td class="px-6 py-4 text-sm text-[#566d8b]">{{ conference.name }}</td>
              <td class="px-6 py-4 text-sm text-[#566d8b]">{{ conference.year }}</td>
              <td class="px-6 py-4 text-sm text-[#566d8b]">
                  <div class="flex flex-wrap gap-2">
                      <span
                          v-for="editor in conference.editors"
                          :key="editor"
                          class="px-2 py-1 text-xs bg-[#fb6c11]/10 text-[#fb6c11] rounded-full"
                      >
                          {{ editor }}
                      </span>
                  </div>
              </td>
              <td class="px-6 py-4">
                <button class="text-[#fb6c11] hover:text-[#566d8b] mr-4">Edit</button>
                <button class="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-96">
        <h3 class="text-lg font-semibold mb-4 text-[#566d8b]">{{ editingConference ? 'Edit' : 'Add' }} Conference</h3>
        <input
          v-model="formData.name"
          placeholder="Conference name"
          class="w-full mb-4 px-4 py-2 border border-[#566d8b] rounded-lg focus:ring-2 focus:ring-[#fb6c11] focus:border-[#fb6c11]"
        />
        <input
          v-model="formData.year"
          type="number"
          placeholder="Year"
          class="w-full mb-4 px-4 py-2 border border-[#566d8b] rounded-lg focus:ring-2 focus:ring-[#fb6c11] focus:border-[#fb6c11]"
        />
        <multi-select
          v-model="formData.editors"
          :options="availableEditors"
          placeholder="Select editors"
          class="mb-4"
        />
        <div class="flex justify-end space-x-3">
          <button @click="closeModal" class="px-4 py-2 text-[#566d8b] hover:text-[#fb6c11]">Cancel</button>
          <button
            @click="saveConference"
            class="px-4 py-2 bg-[#fb6c11] text-white rounded-lg hover:bg-[#566d8b] hover:text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      currentView: 'conferences',
      searchQuery: '',
      showModal: false,
      editingConference: null,
      formData: {
        name: '',
        year: new Date().getFullYear(),
        editors: []
      },
      availableEditors: ['john@example.com', 'jane@example.com', 'admin@example.com'],
      conferences: [
        {
          id: 1,
          name: 'Tech Summit',
          year: 2024,
          editors: ['john@example.com', 'admin@example.com']
        }
      ]
    }
  },
  computed: {
    filteredConferences() {
      return this.conferences.filter(conf =>
        conf.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        conf.year.toString().includes(this.searchQuery))
    }
  },
  methods: {
    // openAddModal() {
    //   this.formData = { name: '', year: new Date().getFullYear(), editors: [] }
    //   this.editingConference = null
    //   this.showModal = true
    // },
    // openEditModal(conference) {
    //   this.formData = { ...conference }
    //   this.editingConference = conference
    //   this.showModal = true
    // },
    // closeModal() {
    //   this.showModal = false
    // },
    // saveConference() {
    //   if (this.editingConference) {
    //     Object.assign(this.editingConference, this.formData)
    //   } else {
    //     this.conferences.push({ ...this.formData, id: Date.now() })
    //   }
    //   this.closeModal()
    // },
    // deleteConference(id) {
    //   this.conferences = this.conferences.filter(conf => conf.id !== id)
    // }
  }
}
</script>
