<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<!-- Register.vue -->
<template>
  <div class="bg-white flex items-center justify-center p-10 px-15 rounded-xl drop-shadow-lg">
    <div class="w-full max-w-md space-y-12">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-green-800 mb-2">Create Account</h1>
        <p class="text-gray-600">Get started with your new account</p>
      </div>
      
      <form class="space-y-2">
        <div>
          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
          >
        </div>
        
        <div>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
          >
        </div>
        
        <div>
          <input
            name="password"
            type="password"
            placeholder="Create password"
            class="mt-2 w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
          >
        </div>

        <div>
          <input
            name="password-confirm"
            type="password"
            placeholder="Confirm password"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
          >
        </div>
        
        <button class="mt-3 w-full bg-green-600 text-white py-1.5 rounded-lg hover:bg-green-700 transition-colors">
          Register
        </button>
        
        <p class="mt-10 text-center text-sm text-gray-600">
          Already have an account? 
          <RouterLink to="login" class="text-green-600 hover:underline">Login here</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>