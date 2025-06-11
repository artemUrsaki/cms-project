<script lang="ts" setup>
import type { ValidationError } from '@/types/types'
import { reactive } from 'vue';

defineProps<{
    message: string;
    error: ValidationError | null;
}>()

const formData = reactive({
    current_password: '',
    password: '',
    password_confirmation: ''
})

const emit = defineEmits<{
    'update': [formData: typeof formData]
}>()

function updatePassword() {
    emit('update', formData);
    formData.current_password = '';
    formData.password = '';
    formData.password_confirmation = '';
}
</script>

<template>
    <div class="p-6 bg-gray-50 border border-primary/20 rounded-lg">
        <h2 class="text-2xl font-semibold mb-4 text-primary">Change Password</h2>
        <form @submit.prevent="updatePassword">
            <div v-if="message"
                class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                role="alert">
                {{ message }}
            </div>
            <div v-if="error?.current_password || error?.password"
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <ul>
                    <li v-for="(msg, field) in error" :key="field">
                        <span class="ml-1">{{ msg[0] }}</span>
                    </li>
                </ul>
            </div>

            <div class="mb-4">
                <label for="currentPassword" class="block text-sm font-medium text-primary mb-1">Current
                    Password</label>
                <input type="password" id="currentPassword" v-model="formData.current_password"
                    class="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm   focus:border-secondary sm:text-sm" />
            </div>
            <div class="mb-4">
                <label for="password" class="block text-sm font-medium text-primary mb-1">Password</label>
                <input type="password" id="password" v-model="formData.password"
                    class="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm   focus:border-secondary sm:text-sm" />
            </div>
            <div class="mb-6">
                <label for="confirm" class="block text-sm font-medium text-primary mb-1">Confirm Password</label>
                <input type="password" id="confirm" v-model="formData.password_confirmation "
                    class="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm   focus:border-secondary sm:text-sm" />
            </div>
            <button type="submit"
                class="px-5 py-2 bg-secondary text-white font-semibold rounded-md hover:bg-primary  focus:ring-2  focus:ring-opacity-75 transition duration-150 ease-in-out">
                Save Password
            </button>
        </form>
    </div>
</template>