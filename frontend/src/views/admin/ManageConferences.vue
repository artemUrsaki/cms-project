<script setup lang="ts">
import { onMounted } from 'vue'
import ConferenceTable from '@/components/ConferenceTable.vue'
import EditConferenceModal from '@/components/ConferenceModal.vue'
import { useAdminConferenceStore } from '@/stores/adminConference'
import { useErrorStore } from '@/stores/error'
import type { ConferenceInput } from '@/types/types'

const conferenceStore = useAdminConferenceStore()
const errorStore = useErrorStore()

onMounted(async () => {
  await conferenceStore.fetch()
  await conferenceStore.fetchEditors()
})

async function saveConference(conference: ConferenceInput) {
  if (conferenceStore.editingConference) {
    await conferenceStore.update(conferenceStore.editingConference.id, conference)
  } else {
    await conferenceStore.create(conference)
  }
  
  if (!errorStore.errors) {
    conferenceStore.toggleModal()
  }
}

function handleToggleModal() {
    if (errorStore.errors) {
        errorStore.clearErrors()
    }
    conferenceStore.toggleModal()
}
</script>

<template>
  <div class="border-b border-primary/20 p-4 bg-white">
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-semibold text-primary">Conference Management</h1>
      <button
        @click="handleToggleModal"
        class="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors"
      >
        Add Conference
      </button>
    </div>
  </div>

  <div class="p-6">
    <ConferenceTable
      :conferences="conferenceStore.conferences"
      :fetchingConferences="conferenceStore.fetching"
      @edit="conferenceStore.toggleModal"
      @delete="conferenceStore.remove"
    />
  </div>

  <EditConferenceModal
    v-if="conferenceStore.conferenceModal"
    :conference="conferenceStore.editingConference"
    :availableEditors="conferenceStore.availableEditors"
    :loading="conferenceStore.loading"
    :errors="errorStore.errors"
    @close="conferenceStore.toggleModal"
    @save="saveConference"
  />
</template>