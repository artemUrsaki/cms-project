<template>
  <div class="bg-white rounded-lg border border-[#566d8b]/20">
    <div class="p-4 border-b border-[#566d8b]/20">
      <input
        type="text"
        v-model="localSearch"
        placeholder="Search conferences..."
        class="w-full px-4 py-2 border border-[#566d8b] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fb6c11] focus:border-[#fb6c11]"
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
              @click="$emit('edit', conference)"
            >
              Edit
            </button>
            <button
              class="text-red-600 hover:text-red-800"
              @click="$emit('delete', conference.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  conferences: Array<{
    id: number
    name: string
    year: number
    editors: string[]
  }>
}>()

const emit = defineEmits<{
  (e: 'edit', conference: any): void
  (e: 'delete', id: number): void
}>()

const localSearch = ref('')

const filteredConferences = computed(() => {
  return props.conferences.filter((conf) =>
    conf.name.toLowerCase().includes(localSearch.value.toLowerCase()) ||
    conf.year.toString().includes(localSearch.value)
  )
})
</script>
