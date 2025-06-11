<script lang="ts" setup>
import { reactive } from 'vue'
import type { User, ValidationError } from '@/types/types'

const props = defineProps<{
    user: User | null
    error: ValidationError | null
    message: string
}>()

const userDetails = reactive({
    first_name: props.user?.first_name || '',
    last_name: props.user?.last_name || '',
    email: props.user?.email || '',
});

</script>

<template>
    <div class="p-6 bg-gray-50 border border-primary/20 rounded-lg">
        <h2 class="text-2xl font-semibold mb-4 text-primary">Edit Profile Details</h2>
        <form @submit.prevent="$emit('update', userDetails)">
            <div v-if="message"
                class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                role="alert">
                {{ message }}
            </div>
            <div v-if="error?.first_name || error?.last_name || error?.email"
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <ul>
                    <li v-for="(msg, field) in error" :key="field">
                        <span class="ml-1">{{ msg[0] }}</span>
                    </li>
                </ul>
            </div>

            <div class="mb-4">
                <label for="firstName" class="block text-sm font-medium text-primary mb-1">First Name</label>
                <input type="text" id="firstName" v-model="userDetails.first_name"
                    class="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:border-secondary sm:text-sm" />
            </div>
            <div class="mb-4">
                <label for="lastName" class="block text-sm font-medium text-primary mb-1">Last Name</label>
                <input type="text" id="lastName" v-model="userDetails.last_name"
                    class="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:border-secondary sm:text-sm" />
            </div>
            <div class="mb-6">
                <label for="email" class="block text-sm font-medium text-primary mb-1">Email</label>
                <input type="email" id="email" v-model="userDetails.email"
                    class="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:border-secondary sm:text-sm" />
            </div>
            <button type="submit"
                class="px-5 py-2 bg-secondary text-white font-semibold rounded-md hover:bg-primary transition duration-150 ease-in-out">
                Save Details
            </button>
        </form>
    </div>
</template>