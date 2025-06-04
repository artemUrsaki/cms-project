<script lang="ts" setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
    <div class=" mt-8 p-6 bg-gray-50 border border-[#566d8b]/20 rounded-lg mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-[#566d8b]">Edit Profile Details</h2>
        <form @submit.prevent="userStore.saveUserDetailsChanges">
            <div v-if="userStore.profileMessage"
                class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                role="alert">
                {{ userStore.profileMessage }}
            </div>
            <div v-if="userStore.profileError"
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                {{ userStore.profileError }}
            </div>

            <div class="mb-4">
                <label for="firstName" class="block text-sm font-medium text-[#566d8b] mb-1">First Name</label>
                <input type="text" id="firstName" v-model="userStore.editedFirstName"
                    class="mt-1 block w-full px-3 py-2 border border-[#566d8b] rounded-md shadow-sm focus:outline-none focus:ring-[#fb6c11] focus:border-[#fb6c11] sm:text-sm" />
            </div>
            <div class="mb-4">
                <label for="lastName" class="block text-sm font-medium text-[#566d8b] mb-1">Last Name</label>
                <input type="text" id="lastName" v-model="userStore.editedLastName"
                    class="mt-1 block w-full px-3 py-2 border border-[#566d8b] rounded-md shadow-sm focus:outline-none focus:ring-[#fb6c11] focus:border-[#fb6c11] sm:text-sm" />
            </div>
            <div class="mb-6">
                <label for="email" class="block text-sm font-medium text-[#566d8b] mb-1">Email</label>
                <input type="email" id="email" v-model="userStore.editedEmail"
                    class="mt-1 block w-full px-3 py-2 border border-[#566d8b] rounded-md shadow-sm focus:outline-none focus:ring-[#fb6c11] focus:border-[#fb6c11] sm:text-sm" />
            </div>
            <button type="submit"
                class="px-5 py-2 bg-[#fb6c11] text-white font-semibold rounded-md hover:bg-[#566d8b] focus:outline-none focus:ring-2 focus:ring-[#fb6c11] focus:ring-opacity-75 transition duration-150 ease-in-out">
                Save Details
            </button>
        </form>
    </div>
</template>