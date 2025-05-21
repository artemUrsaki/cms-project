<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { reactive } from 'vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const form = reactive({
  email: '',
  password: ''
})
</script>

<template>
  <div class="bg-white px-15 flex items-center justify-center p-10 rounded-xl drop-shadow-lg">
    <div class="w-full max-w-md space-y-12">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-green-800 mb-2">Welcome Back</h1>
        <p class="text-gray-600">Sign in to your account</p>
      </div>
      
      <form @submit.prevent="() => { userStore.login(form) }" class="space-y-2">
        <div>
          <input
            v-model="form.email"
            name="email"
            type="email"
            placeholder="Enter your email"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
          >
        </div>
        
        <div>
          <input
            v-model="form.password"
            name="password"
            type="password"
            placeholder="Enter password"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
          >
        </div>
        
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
</template>