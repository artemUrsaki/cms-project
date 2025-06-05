<template>
  <aside
    class="w-72 fixed top-16 left-0 h-[calc(100vh-4rem)] bg-[#f0f2f7] shadow-2xl border-r border-[#566d8b]/20 z-50 p-4 overflow-y-auto"
  >
    <h2 class="text-xl font-bold text-[#566d8b] mb-4">Manage Subpages</h2>

    <div v-if="loading" class="text-[#566d8b] mb-4">Loading...</div>

    <ul class="mb-6 space-y-2">
      <li
        v-for="subpage in subpages"
        :key="subpage.id"
        class="flex justify-between items-center bg-white px-3 py-2 rounded shadow-sm border border-[#566d8b]/10 hover:bg-[#e9ecf1] transition"
      >
        <router-link
          :to="`/subpages/${subpage.id}`"
          class="text-[#566d8b] font-medium hover:underline truncate"
        >
          {{ subpage.title }}
        </router-link>

        <div v-if="isAdmin" class="flex space-x-2">
          <button
            @click="edit(subpage)"
            class="text-[#fb6c11] hover:text-orange-700"
            title="Edit"
          >
            ✏️
          </button>
          <button
            @click="remove(subpage.id)"
            class="text-red-500 hover:text-red-700"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </li>
    </ul>

    <!-- Admin Form -->
    <div v-if="isAdmin" class="space-y-2">
      <input
        v-model="newTitle"
        placeholder="Title"
        class="border border-[#566d8b]/30 px-3 py-2 w-full rounded text-[#566d8b]"
      />
      <input
        v-model="newConferenceId"
        type="number"
        placeholder="Conference ID"
        class="border border-[#566d8b]/30 px-3 py-2 w-full rounded text-[#566d8b]"
      />
      <Editor
        api-key="ec1faa6bpiqolc8xrvnn8dss5hecm2qu409qa4whkb33432f"
        v-model="newContent"
        :init="{
          height: 200,
          menubar: false,
          plugins: 'link lists code',
          toolbar:
            'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | code',
          content_style: 'body { font-family:Inter; font-size:14px; color:#566d8b }'
        }"
        class="mb-2"
      />
      <button
        @click="create"
        class="bg-[#fb6c11] text-white px-4 py-2 rounded hover:bg-[#e95e0b] w-full transition"
      >
        ➕ Add Subpage
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useSubpageStore } from '@/stores/subpages';
import { useUserStore } from '@/stores/user';
import Editor from '@tinymce/tinymce-vue';

const subpageStore = useSubpageStore();
const userStore = useUserStore();

const loading = ref(false);
const newTitle = ref('');
const newContent = ref('');
const newConferenceId = ref<number | null>(null);

onMounted(async () => {
  loading.value = true;
  await subpageStore.fetchSubpages();
  loading.value = false;
});

const create = async () => {
  if (!newTitle.value.trim() || !newConferenceId.value) return;

  await subpageStore.addSubpage({
    title: newTitle.value,
    content: newContent.value,
    conference_id: newConferenceId.value,
  });

  newTitle.value = '';
  newContent.value = '';
  newConferenceId.value = null;
};

const remove = async (id: number) => {
  await subpageStore.deleteSubpage(id);
};

const edit = async (subpage: any) => {
  const newTitle = prompt('Edit title:', subpage.title);
  if (newTitle !== null) {
    await subpageStore.updateSubpage(subpage.id, { title: newTitle });
  }
};

const subpages = computed(() => subpageStore.subpages);
const isAdmin = computed(() => userStore.isAdmin);
</script>
