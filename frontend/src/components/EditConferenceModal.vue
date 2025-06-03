<template>
  <div class="fixed inset-0 bg-[#566d8b]/10 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg w-96 shadow-lg">
      <h3 class="text-lg font-semibold mb-4 text-[#566d8b]">
        {{ editingConference ? 'Edit' : 'Add' }} Conference
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
        <button @click="$emit('close')" class="px-4 py-2 text-[#566d8b] hover:text-[#fb6c11]">
          Cancel
        </button>
        <button @click="$emit('save')" class="px-4 py-2 bg-[#fb6c11] text-white rounded-lg hover:bg-[#566d8b] hover:text-white">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

defineProps<{
  formData: {
    name: string
    year: number
    editors: string[]
  }
  availableEditors: string[]
  editingConference: any
}>()

defineEmits(['close', 'save'])
</script>
