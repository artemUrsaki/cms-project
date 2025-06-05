<template>
  <div class="min-h-screen bg-[#f6f7fa] pt-20 pl-72 pr-6">
    <div class="max-w-5xl mx-auto bg-white rounded-xl shadow-lg border border-[#566d8b]/20 p-8">
      <div v-if="subpage">
        <h1 class="text-4xl font-bold text-[#566d8b] mb-6">{{ subpage.title }}</h1>
        <div class="prose prose-lg max-w-none text-[#566d8b]">
          <p v-html="subpage.content"></p>
        </div>
      </div>
      <div v-else class="text-center text-[#566d8b] text-lg">
        <p>Loading subpage content...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const subpage = ref<any>(null);

onMounted(async () => {
  try {
    const { data } = await axios.get(`/api/subpages/${route.params.id}`);
    subpage.value = data;
  } catch (error) {
    console.error('Failed to fetch subpage:', error);
  }
});
</script>


