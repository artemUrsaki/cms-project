<script setup lang="ts">
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import type { Conference, ValidationError } from '@/types/types'
import { reactive, useTemplateRef, onMounted } from 'vue'
import LoadingModal from '@/components/LoadingModal.vue'

const props = defineProps<{
  conference: Conference | null
  availableEditors: string[]
  loading: boolean
  errors: ValidationError | null
}>()

const modalForm = reactive({
  name: props.conference?.name || '',
  year: props.conference?.year || new Date().getFullYear(),
  editors: props.conference?.editors || []
})

const input = useTemplateRef<HTMLInputElement>('focus-input')

onMounted(() => {
  input.value?.focus()
})
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-[1001]">
    <div @click="$emit('close')" class="absolute top-0 bottom-0 left-0 right-0"></div>
    <div class="bg-white p-6 rounded-lg w-96 z-[1002] relative">
      <LoadingModal class="rounded-lg" v-if="loading" />

      <form @submit.prevent="$emit('save', modalForm)" class="space-y-4">
        <h3 class="text-lg font-semibold mb-4 text-center text-[#566d8b]">
          {{ props.conference ? 'Edit' : 'Add' }} Conference
        </h3>
        <p v-if="errors?.name" class="mb-1 text-red-500">{{ errors?.name[0] }}</p>
        <input
          ref="focus-input"
          v-model="modalForm.name"
          placeholder="Conference Name"
          class="w-full mb-4 px-4 py-2 border border-[#566d8b] rounded-lg focus:ring focus:ring-[#fb6c11] focus:border-[#fb6c11]"
        />
        <p v-if="errors?.year" class="mb-1 text-red-500">{{ errors?.year[0] }}</p>
        <input
          v-model="modalForm.year"
          type="number"
          placeholder="Year"
          class="w-full mb-4 px-4 py-2 border border-[#566d8b] rounded-lg focus:ring focus:ring-[#fb6c11] focus:border-[#fb6c11]"
        />
        <p v-if="errors?.editors" class="mb-1 text-red-500">{{ errors?.editors[0] }}</p>
        <Multiselect
          v-model="modalForm.editors"
          :options="availableEditors"
          :multiple="true"
          :taggable="true"
          tag-placeholder="Add editor"
          placeholder="Select editors"
          class="mb-4"
        />
        <div class="flex justify-end space-x-3">
          <button type="button" @click="$emit('close')" class="px-4 py-2 text-[#566d8b] hover:text-[#fb6c11]">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-[#fb6c11] text-white rounded-lg hover:bg-[#566d8b] hover:text-white transition-colors">
            {{ conference ? 'Save' : 'Add' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>