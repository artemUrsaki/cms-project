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
    <ConferenceTable
      :conferences="conferenceStore.conferences"
      @edit="openEditModal"
      @delete="deleteConference"
    />
  </div>

  <EditConferenceModal
    v-if="conferenceStore.conferenceModal"
    :formData="formData"
    :availableEditors="availableEditors"
    :editingConference="conferenceStore.editingConference"
    @close="closeModal"
    @save="saveConference"
  />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import ConferenceTable from '@/components/ConferenceTable.vue'
import EditConferenceModal from '@/components/EditConferenceModal.vue'
import { useAdminConferenceStore } from '@/stores/adminConference'

const conferenceStore = useAdminConferenceStore()

const formData = reactive({
  name: '',
  year: new Date().getFullYear(),
  editors: [] as string[],
})

const availableEditors = ref<string[]>([])

onMounted(async () => {
  await conferenceStore.fetch()
  await fetchEditors()
})

async function fetchEditors() {
  try {
    const res = await axios.get('/api/conference-editors')
    availableEditors.value = res.data
  } catch (e) {
    console.error('Failed to load editors:', e)
  }
}

function openAddModal() {
  formData.name = ''
  formData.year = new Date().getFullYear()
  formData.editors = []
  conferenceStore.toggleModal(null)
}

function openEditModal(conference: any) {
  formData.name = conference.name
  formData.year = conference.year
  formData.editors = [...conference.editors]
  conferenceStore.toggleModal(conference)
}

function closeModal() {
  conferenceStore.toggleModal(null)
}

async function saveConference() {
  if (conferenceStore.editingConference) {
    await conferenceStore.update(conferenceStore.editingConference.id, { ...formData })
  } else {
    await conferenceStore.create({ ...formData })
  }
  closeModal()
}

function deleteConference(id: number) {
  conferenceStore.remove(id)
}
</script>
