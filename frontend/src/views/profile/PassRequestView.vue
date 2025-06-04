<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user.ts'; // Import the entire store

const email = ref<string>('');
const userStore = useUserStore(); // Use the store

const handleRequestPassword = async () => {
    if (email.value) {
        await userStore.request_password(email.value);
    } else {
        console.log('Please enter your email address.');
    }
};
</script>
<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 class="text-2xl font-bold mb-6 text-center">Request Password</h1>
            <!-- Form goes here -->
            <form @submit.prevent="handleRequestPassword">
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2" for="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        v-model="email" required
                    />
                </div>
                <button
                    type="submit"
                    class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Send Reset Link
                </button>
            </form>
        </div>
    </div>
</template>


<!--poopup-->