<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';

const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

const passwordMessage = ref('');
const passwordError = ref('');


const savePasswordChanges = async () => {
    passwordMessage.value = '';
    passwordError.value = '';

    if (newPassword.value !== confirmNewPassword.value) {
        passwordError.value = "New password and confirmation don't match!";
        return;
    }

    try {
        const response = await axios.put('/user/password', {
            current_password: currentPassword.value,
            password: newPassword.value,
            password_confirmation: confirmNewPassword.value,
        });

        passwordMessage.value = 'Password updated successfully!';

        currentPassword.value = '';
        newPassword.value = '';
        confirmNewPassword.value = '';

    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.errors) {
            passwordError.value = Object.values(error.response.data.errors).flat().join('\n');
        } else {
            passwordError.value = 'An unexpected error occurred while changing password.';
        }
        console.error('Error saving password changes:', error);
    }
};
</script>

<template>
    <div class="p-6 bg-gray-50 border border-[#566d8b]/20 rounded-lg">
        <h2 class="text-2xl font-semibold mb-4 text-[#566d8b]">Change Password</h2>
        <form @submit.prevent="savePasswordChanges">
            <div v-if="passwordMessage"
                class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                role="alert">
                {{ passwordMessage }}
            </div>
            <div v-if="passwordError"
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                {{ passwordError }}
            </div>

            <div class="mb-4">
                <label for="currentPassword" class="block text-sm font-medium text-[#566d8b] mb-1">Current
                    Password</label>
                <input type="password" id="currentPassword" v-model="currentPassword"
                    class="mt-1 block w-full px-3 py-2 border border-[#566d8b] rounded-md shadow-sm focus:outline-none focus:ring-[#fb6c11] focus:border-[#fb6c11] sm:text-sm" />
            </div>
            <div class="mb-4">
                <label for="newPassword" class="block text-sm font-medium text-[#566d8b] mb-1">New Password</label>
                <input type="password" id="newPassword" v-model="newPassword"
                    class="mt-1 block w-full px-3 py-2 border border-[#566d8b] rounded-md shadow-sm focus:outline-none focus:ring-[#fb6c11] focus:border-[#fb6c11] sm:text-sm" />
            </div>
            <div class="mb-6">
                <label for="confirmNewPassword" class="block text-sm font-medium text-[#566d8b] mb-1">Confirm New
                    Password</label>
                <input type="password" id="confirmNewPassword" v-model="confirmNewPassword"
                    class="mt-1 block w-full px-3 py-2 border border-[#566d8b] rounded-md shadow-sm focus:outline-none focus:ring-[#fb6c11] focus:border-[#fb6c11] sm:text-sm" />
            </div>
            <button type="submit"
                class="px-5 py-2 bg-[#fb6c11] text-white font-semibold rounded-md hover:bg-[#566d8b] focus:outline-none focus:ring-2 focus:ring-[#fb6c11] focus:ring-opacity-75 transition duration-150 ease-in-out">
                Save Password
            </button>
        </form>
    </div>
</template>