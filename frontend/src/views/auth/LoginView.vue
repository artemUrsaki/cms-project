<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { useErrorStore } from '@/stores/error';
import LoadingModal from '@/components/LoadingModal.vue';

const userStore = useUserStore()
const errorStore = useErrorStore();

const form = reactive({
  email: '',
  password: ''
})
</script>

<!-- <template>
  <div class="bg-white px-15 flex items-center justify-center p-10 rounded-xl drop-shadow-lg max-w-sm relative">
    <LoadingModal v-if="userStore.loggingUser" />

    <div class="w-full space-y-12">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-green-800 mb-2">Welcome Back</h1>
        <p class="text-gray-600">Sign in to your account</p>
      </div>
      
      <form @submit.prevent="() => { userStore.login(form) }" class="space-y-2">
        <p v-if="errorStore.errors.email" class="text-red-500">{{ errorStore.errors.email[0] }}</p>
        <input
          v-model="form.email"
          name="email"
          type="email"
          placeholder="Enter your email"
          class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
        >
      
        <p v-if="errorStore.errors.password" class="text-red-500">{{ errorStore.errors.password[0] }}</p>
        <input
          v-model="form.password"
          name="password"
          type="password"
          placeholder="Enter password"
          class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
        >
        
        <button type="submit" class="cursor-pointer mt-3 w-full bg-green-600 text-white py-1.5 rounded-lg hover:bg-green-700 transition-colors">
          Sign In
        </button>
        
        <p class="text-center text-sm text-gray-600 mt-10">
          Don't have an account? 
          <RouterLink to="register" class="text-green-600 hover:underline">Register here</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template> -->
<template>
  <div class="bg-white px-15 flex items-center justify-center p-10 rounded-xl drop-shadow-lg max-w-sm relative">
    <LoadingModal class="rounded-xl" v-if="userStore.loggingUser" />

    <div class="w-full space-y-12">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-[#566d8b] mb-2">Welcome Back</h1>
        <p class="text-[#566d8b]">Sign in to your account</p>
      </div>
      
      <form @submit.prevent="() => { userStore.login(form) }" class="space-y-2">
        <p v-if="errorStore.errors?.email" class="text-red-500">{{ errorStore.errors.email[0] }}</p>
        <input
          v-model="form.email"
          name="email"
          type="email"
          placeholder="Enter your email"
          class="w-full px-3 py-1.5 border border-[#566d8b] rounded-lg focus:ring focus:ring-[#fb6c11] focus:border-[#fb6c11]"
        >
      
        <p v-if="errorStore.errors?.password" class="text-red-500">{{ errorStore.errors.password[0] }}</p>
        <input
          v-model="form.password"
          name="password"
          type="password"
          placeholder="Enter password"
          class="w-full px-3 py-1.5 border border-[#566d8b] rounded-lg focus:ring focus:ring-[#fb6c11] focus:border-[#fb6c11]"
        >
        
        <button type="submit" class="cursor-pointer mt-3 w-full bg-[#566d8b] text-white py-1.5 rounded-lg hover:bg-[#fb6c11] hover:text-white transition-colors">
          Sign In
        </button>
        
        <p class="text-center text-sm text-[#566d8b] mt-10">
          Don't have an account? 
          <RouterLink to="register" class="text-[#fb6c11] hover:underline hover:text-[#566d8b]">Register here</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>