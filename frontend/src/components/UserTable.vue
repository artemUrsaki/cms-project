<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAdminUserStore } from '@/stores/adminUser';
import LoadingModal from './LoadingModal.vue';

const searchQuery = ref('');
const adminUserStore = useAdminUserStore()

const filteredUsers = computed(() => {
    return adminUserStore.users.filter(user =>
        user.first_name.toLowerCase().startsWith(searchQuery.value.toLowerCase()) ||
        user.last_name.toLowerCase().startsWith(searchQuery.value.toLowerCase()) ||
        user.email.toLowerCase().startsWith(searchQuery.value.toLowerCase()))
});

function editUser(id: number) {
    adminUserStore.toggleModal()
    adminUserStore.edit(id)
}

function deleteUser(id: number) {
    adminUserStore.destroy(id)
    adminUserStore.fetch()
}
</script>

<template>
    <div class="p-6">
        <div class="bg-white rounded-lg border border-[#566d8b]/20 relative min-h-40">
            <LoadingModal class="rounded-lg" v-if="adminUserStore.fetching" />

            <div v-else-if="adminUserStore.users.length > 0">
                <div class="p-4 border-b border-[#566d8b]/20">
                    <input
                        type="text"
                        placeholder="Search users..."
                        class="w-full px-4 py-2 border border-[#566d8b] rounded-lg focus:outline-none focus:ring focus:ring-[#fb6c11] focus:border-[#fb6c11]"
                        v-model="searchQuery"
                    >
                </div>

                <table class="w-full">
                    <thead class="bg-[#566d8b]/10">
                        <tr class="text-left">
                            <th class="px-6 py-3 text-sm font-medium text-[#566d8b]">Full Name</th>
                            <th class="px-6 py-3 text-sm font-medium text-[#566d8b]">Email</th>
                            <th class="px-6 py-3 text-sm font-medium text-[#566d8b]">Role</th>
                            <th class="px-6 py-3 text-sm font-medium text-[#566d8b]">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-[#566d8b]/10">
                        <tr v-for="user in filteredUsers" :key="user.id">
                            <td class="px-6 py-4 text-sm text-[#566d8b]">{{ user.first_name + ' ' + user.last_name }}</td>
                            <td class="px-6 py-4 text-sm text-[#566d8b]">{{ user.email }}</td>
                            <td class="px-6 py-4 text-sm text-[#566d8b]">
                                <div class="flex flex-wrap gap-2">
                                    <span class="px-2 py-1 text-xs bg-[#fb6c11]/10 text-[#fb6c11] rounded-full">
                                        {{ user.role.charAt(0).toUpperCase() + user.role.slice(1) }}
                                    </span>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <button @click="editUser(user.id)" class="text-[#fb6c11] hover:text-[#566d8b] mr-4">Edit</button>
                                <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-800">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="p-6 text-center" v-else>
                <h3 class="text-[#566d8b]">There are no users yet.</h3>
            </div>
        </div>
    </div>
</template>
