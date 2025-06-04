<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user.ts';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const email = ref<string>('');
const token = ref<string>('');
const password = ref<string>('');
const conf_password = ref<string>('');

const userStore = useUserStore();

onMounted(() => {
    const urlEmail = route.query.email as string | undefined;
    const urlToken = route.query.token as string | undefined;

    if (urlEmail) {
        email.value = urlEmail;
    }
    if (urlToken) {
        token.value = urlToken;
    }

    console.log('Email from URL:', email.value);
    console.log('Token from URL:', token.value);
});

const handleResetPassword = async () => {
    if (token.value && email.value && password.value && conf_password.value) {
        await userStore.reset_password(
            token.value,
            email.value,
            password.value,
            conf_password.value
        );
        router.push('/login');
    } else {
        console.log('Please ensure all fields are filled.');
    }
};
</script>
<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 class="text-2xl font-bold mb-6 text-center">Reset Password</h1>
            <!-- Form goes here -->
            <form @submit.prevent="handleResetPassword">
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2" for="pass">Password</label>
                    <input id="pass" type="password"
                        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password" v-model="password" required />

                    <label class="block text-gray-700 mb-2" for="conf_pass">Confirm Password</label>
                    <input id="conf_pass" type="password"
                        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password" v-model="conf_password" required />
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Submit</button>
            </form>
        </div>
    </div>
</template>