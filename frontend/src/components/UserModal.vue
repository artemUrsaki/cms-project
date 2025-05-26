<script setup lang="ts">
import { onMounted, reactive, useTemplateRef } from 'vue';
import { useAdminUserStore } from '@/stores/adminUser';

const adminUserStore = useAdminUserStore()

const input = useTemplateRef('focus-input')

onMounted(() => {
    input.value?.focus()
})

async function createUser() {
    if (adminUserStore.userId > -1)  {
        await adminUserStore.update()
    } else {
        await adminUserStore.create()
    }

    if (!adminUserStore.isError) {
        adminUserStore.toggleModal()
        adminUserStore.fetch()
    }
}
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-[1001]">
        <div @click="adminUserStore.toggleModal" class="absolute top-0 bottom-0 left-0 right-0"></div>
        <div class="bg-white p-6 rounded-lg w-96 z-[1002]">
            <form @submit.prevent="createUser">
                <h3 class="text-lg font-semibold mb-4 text-center">User</h3>
                <p v-if="adminUserStore.errors.first_name" class="text-red">{{ adminUserStore.errors.first_name[0] }}</p>
                <input
                    ref="focus-input"
                    v-model="adminUserStore.user.first_name"
                    placeholder="First Name"
                    class="w-full mb-4 px-4 py-2 border rounded-lg"
                />
                <p v-if="adminUserStore.errors.last_name" class="text-red">{{ adminUserStore.errors.last_name[0] }}</p>
                <input
                    v-model="adminUserStore.user.last_name"
                    placeholder="Last Name"
                    class="w-full mb-4 px-4 py-2 border rounded-lg"
                />
                <p v-if="adminUserStore.errors.email" class="text-red">{{ adminUserStore.errors.email[0] }}</p>
                <input
                    v-model="adminUserStore.user.email"
                    placeholder="User Email"
                    class="w-full mb-4 px-4 py-2 border rounded-lg"
                />
                <p v-if="adminUserStore.errors.role" class="text-red">{{ adminUserStore.errors.role[0] }}</p>
                <select v-model="adminUserStore.user.role" placeholder="Select Role" class="mb-4">
                    <option v-for="(role, id) in adminUserStore.roles" :key='id' :value="role">
                        {{ role }}
                    </option>
                </select>
                <div class="flex justify-end space-x-3">
                    <button type="button" @click="adminUserStore.toggleModal" class="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
