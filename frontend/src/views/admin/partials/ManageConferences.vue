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
        />
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
          <tr
            v-for="conference in filteredConferences"
            :key="conference.id"
          >
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
              <button
                class="text-[#fb6c11] hover:text-[#566d8b] mr-4"
                @click="openEditModal(conference)"
              >
                Edit
              </button>
              <button
                class="text-red-600 hover:text-red-800"
                @click="deleteConference(conference.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div
    v-if="conferenceStore.conferenceModal"
    class="fixed inset-0 bg-[#566d8b]/10 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg w-96 shadow-lg">
      <h3 class="text-lg font-semibold mb-4 text-[#566d8b]">
        {{ conferenceStore.editingConference ? 'Edit' : 'Add' }} Conference
      </h3>
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

      <Multiselect
        v-model="formData.editors"
        :options="availableEditors"
        :multiple="true"
        :taggable="true"
        tag-placeholder="Add editor"
        placeholder="Select editors"
        class="mb-4"
      />

      <div class="flex justify-end space-x-3">
        <button
          @click="closeModal"
          class="px-4 py-2 text-[#566d8b] hover:text-[#fb6c11]"
        >
          Cancel
        </button>
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

<script setup lang="ts">
import 'vue-multiselect/dist/vue-multiselect.min.css'
import Multiselect from 'vue-multiselect'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useAdminConferenceStore } from '@/stores/adminConference'

const conferenceStore = useAdminConferenceStore()

const searchQuery = ref('')
const formData = ref({
  name: '',
  year: new Date().getFullYear(),
  editors: [] as string[],
})

const availableEditors = ref<string[]>([])

onMounted(async () => {
  await conferenceStore.fetch()

  try {
    const res = await axios.get('/api/editors')
    availableEditors.value = res.data
  } catch (e) {
    console.error('Failed to load editors:', e)
  }
})

const filteredConferences = computed(() => {
  return conferenceStore.conferences.filter((conf) =>
    conf.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    conf.year.toString().includes(searchQuery.value)
  )
})

function openAddModal() {
  formData.value = {
    name: '',
    year: new Date().getFullYear(),
    editors: [],
  }
  conferenceStore.toggleModal(null)
}

function openEditModal(conference: any) {
  formData.value = {
    name: conference.name,
    year: conference.year,
    editors: [...conference.editors],
  }
  conferenceStore.toggleModal(conference)
}

function closeModal() {
  conferenceStore.toggleModal(null)
}

async function saveConference() {
  if (conferenceStore.editingConference) {
    await conferenceStore.update(conferenceStore.editingConference.id, formData.value)
  } else {
    await conferenceStore.create(formData.value)
  }
  closeModal()
}

function deleteConference(id: number) {
  conferenceStore.remove(id)
}
</script>
