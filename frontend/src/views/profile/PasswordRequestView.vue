<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useErrorStore } from '@/stores/error'

const email = ref('')
const userStore = useUserStore()
const errorStore = useErrorStore()
const success = ref(false)

const handleRequestPassword = async () => {
    if (email.value) {
        await userStore.request_password(email.value)

        if (!errorStore.errors?.email) {
            success.value = true
        }
    }
}
</script>

<template>
  <div class="bg-white sm:px-12 px-10 items-center justify-center sm:py-10 py-8 rounded-xl drop-shadow-lg sm:min-w-sm relative">
    <div v-if="success" class="flex flex-col text-center items-center justify-center py-6">
        <svg class="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <p class="text-lg font-semibold text-green-600 mb-1">Success!</p>
        <p class="text-xs sm:text-sm text-primary">A reset link has been sent to your email.</p>
    </div>

    <div v-else>
        <div class="text-center mb-8">
          <h1 class="text-2xl sm:text-3xl font-bold text-primary mb-1">Request Password</h1>
          <p class="text-sm sm:text-base text-primary">Enter your email to receive a reset link</p>
        </div>
    
        <form @submit.prevent="handleRequestPassword" class="text-center">
          <div class="mb-8 text-left">
            <label for="email" class="block text-xs sm:text-sm font-medium text-primary mb-1">Email</label>
            <p v-if="errorStore.errors?.email" class="mb-1 text-xs sm:text-sm text-red-500">{{ errorStore.errors.email[0] }}</p>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required
              class="text-xs sm:text-base w-full px-3 py-2 sm:py-1.5 border border-primary rounded-lg focus:border-secondary shadow-sm"
            >
          </div>
          <button
            type="submit"
            class="text-sm sm:text-base font-semibold secondary bg-secondary text-white py-1.5 sm:py-2 min-w-30 sm:min-w-40 rounded-lg hover:bg-primary active:bg-primary transition duration-150 ease-in-out"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
</template>