<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';
import { useAdminUserStore } from '@/stores/adminUser';
import { useErrorStore } from '@/stores/error';
import LoadingModal from './LoadingModal.vue';

const adminUserStore = useAdminUserStore()
const errorStore = useErrorStore()

const input = useTemplateRef<HTMLInputElement>('focus-input')

onMounted(() => {
    input.value?.focus()
})

async function createUser() {
    if (adminUserStore.userId > -1)  {
        await adminUserStore.update()
    } else {
        await adminUserStore.create()
    }

    if (!errorStore.isError) {
        adminUserStore.toggleModal()
        adminUserStore.fetch()
    }
}
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-[1001]">
        <div @click="adminUserStore.toggleModal" class="absolute top-0 bottom-0 left-0 right-0"></div>
        <div class="bg-white p-6 rounded-lg w-96 z-[1002] relative">
            <LoadingModal class="rounded-lg" v-if="adminUserStore.loadingUser" />

            <form @submit.prevent="createUser">
                <h3 class="text-lg font-semibold mb-4 text-center text-[#566d8b]">User</h3>
                <p v-if="errorStore.errors.first_name" class="text-red-500">{{ errorStore.errors.first_name[0] }}</p>
                <input
                    ref="focus-input"
                    v-model="adminUserStore.user.first_name"
                    placeholder="First Name"
                    class="w-full mb-4 px-4 py-2 border border-[#566d8b] rounded-lg focus:ring focus:ring-[#fb6c11] focus:border-[#fb6c11]"
                />
                <p v-if="errorStore.errors.last_name" class="text-red-500 ">{{ errorStore.errors.last_name[0] }}</p>
                <input
                    v-model="adminUserStore.user.last_name"
                    placeholder="Last Name"
                    class="w-full mb-4 px-4 py-2 border border-[#566d8b] rounded-lg focus:ring focus:ring-[#fb6c11] focus:border-[#fb6c11]"
                />
                <p v-if="errorStore.errors.email" class="text-red-500">{{ errorStore.errors.email[0] }}</p>
                <input
                    v-model="adminUserStore.user.email"
                    placeholder="User Email"
                    class="w-full mb-4 px-4 py-2 border border-[#566d8b] rounded-lg focus:ring focus:ring-[#fb6c11] focus:border-[#fb6c11]"
                />
                <p v-if="errorStore.errors.role" class="text-red-500">{{ errorStore.errors.role[0] }}</p>
                <select v-model="adminUserStore.user.role" placeholder="Select Role" class="mb-4 w-full px-2 py-2 border border-[#566d8b] rounded-lg focus:ring focus:ring-[#fb6c11] focus:border-[#fb6c11]">
                    <option v-for="(role, id) in adminUserStore.roles" :key='id' :value="role">
                        {{ role.charAt(0).toUpperCase() + role.slice(1) }}
                    </option>
                </select>
                <div class="flex justify-end space-x-3">
                    <button type="button" @click="adminUserStore.toggleModal" class="px-4 py-2 text-[#566d8b] hover:text-[#fb6c11]">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-[#fb6c11] text-white rounded-lg hover:bg-[#566d8b] hover:text-white transition-colors">
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
