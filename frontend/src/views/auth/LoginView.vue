<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { useErrorStore } from '@/stores/error';

const userStore = useUserStore()
const errorStore = useErrorStore();

const form = reactive({
  email: '',
  password: ''
})
</script>

<template>
  <div class="bg-white sm:px-12 px-10 items-center justify-center sm:py-10 py-8 rounded-xl drop-shadow-lg sm:min-w-sm relative">
    <div class="text-center mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-primary mb-1">Welcome Back</h1>
      <p class="text-sm sm:text-base text-primary">Sign in to your account</p>
    </div>
    
    <form @submit.prevent="() => { userStore.login(form) }" class="text-center">
      <div class="mb-2 text-left">
        <label for="email" class="block text-xs sm:text-sm font-medium text-primary mb-1">Email</label>
        <p v-if="errorStore.errors?.email" class="mb-1 text-xs sm:text-sm text-red-500">{{ errorStore.errors.email[0] }}</p>
        <input
          id="email"
          v-model="form.email"
          name="email"
          type="email"
          class="text-xs sm:text-base w-full px-3 py-2 sm:py-1.5 border border-primary rounded-lg focus:border-secondary shadow-sm"
        >
      </div>
    
      <div class="mb-8 text-left">
        <label for="password" class="block text-xs sm:text-sm font-medium text-primary mb-1">Password</label>
        <p v-if="errorStore.errors?.password" class="mb-1 text-xs sm:text-sm text-red-500">{{ errorStore.errors.password[0] }}</p>
        <input
          id="password"
          v-model="form.password"
          name="password"
          type="password"
          class="text-xs sm:text-base mb-1 w-full px-3 py-2 sm:py-1.5 border border-primary rounded-lg focus:border-secondary shadow-sm"
        >
        <div class="text-right">
          <RouterLink class="text-xs sm:text-sm hover:text-secondary active:text-secondary" to="password-request">Forgot your password?</RouterLink>
        </div>
      </div>

      <button type="submit" class="text-sm sm:text-base font-semibold secondary bg-secondary text-white py-1.5 sm:py-2 min-w-30 sm:min-w-40 rounded-lg hover:bg-primary active:bg-primary transition duration-150 ease-in-out">
        Sign In
      </button>
    </form>
  </div>
</template>