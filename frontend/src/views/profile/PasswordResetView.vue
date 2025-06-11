<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user.ts';
import { useRoute, useRouter } from 'vue-router';
import { useErrorStore } from '@/stores/error';

const route = useRoute();
const router = useRouter();

const email = ref<string>('');
const token = ref<string>('');
const password = ref<string>('');
const conf_password = ref<string>('');
const success = ref(false);

const userStore = useUserStore();
const errorStore = useErrorStore();

onMounted(() => {
    const urlEmail = route.query.email as string | undefined;
    const urlToken = route.query.token as string | undefined;

    if (urlEmail) {
        email.value = urlEmail;
    }
    if (urlToken) {
        token.value = urlToken;
    }
});

const handleResetPassword = async () => {
    await userStore.reset_password(
        token.value,
        email.value,
        password.value,
        conf_password.value
    )

    if (!errorStore.errors?.email && !errorStore.errors?.password) {
        success.value = true;
    }
};
</script>

<template>
  <div class="bg-white sm:px-12 px-10 items-center justify-center sm:py-10 py-8 rounded-xl drop-shadow-lg sm:min-w-sm relative">
    <div v-if="success" class="flex flex-col text-center items-center justify-center py-6">
      <svg class="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <p class="text-lg font-semibold text-green-600 mb-1">Success!</p>
      <p class="text-xs sm:text-sm text-primary mb-10">Your password has been reset.</p>
      <RouterLink
        to="/login"
        class="text-sm sm:text-base font-semibold secondary bg-secondary text-white py-1.5 sm:py-2 min-w-30 sm:min-w-40 rounded-lg hover:bg-primary active:bg-primary transition duration-150 ease-in-out"
      >
        Go to Login
      </RouterLink>
    </div>

    <div v-else>
      <div class="text-center mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-primary mb-1">Reset Password</h1>
        <p class="text-sm sm:text-base text-primary">Enter your new password below</p>
      </div>
      <form @submit.prevent="handleResetPassword" class="text-center">
        <div class="mb-8 text-left">
          <label for="password" class="block text-xs sm:text-sm font-medium text-primary mb-1">New Password</label>
          <p v-if="errorStore.errors?.password" class="mb-1 text-xs sm:text-sm text-red-500">{{ errorStore.errors.password[0] }}</p>
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            class="text-xs sm:text-base w-full px-3 py-2 sm:py-1.5 border border-primary rounded-lg focus:border-secondary shadow-sm"
          >

          <label for="conf_password" class="block text-xs sm:text-sm font-medium text-primary mb-1 mt-4">Confirm Password</label>
          <input
            id="conf_password"
            v-model="conf_password"
            name="conf_password"
            type="password"
            class="text-xs sm:text-base w-full px-3 py-2 sm:py-1.5 border border-primary rounded-lg focus:border-secondary shadow-sm"
          >
        </div>
        <button
          type="submit"
          class="text-sm sm:text-base font-semibold secondary bg-secondary text-white py-1.5 sm:py-2 min-w-30 sm:min-w-40 rounded-lg hover:bg-primary active:bg-primary transition duration-150 ease-in-out"
        >
          Reset Password
        </button>
      </form>
    </div>
  </div>
</template>