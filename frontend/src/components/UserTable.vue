<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAdminUserStore } from '@/stores/adminUser';
import { DESTRUCTION } from 'dns';

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
    <div class="p-6" v-if="adminUserStore.users.length > 0">
        <div class="bg-white rounded-lg border border-gray-200">
            <div class="p-4 border-b border-gray-200">
                <input
                    type="text"
                    placeholder="Search users..."
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    v-model="searchQuery"
                >
            </div>

            <table class="w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Full Name</th>
                        <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                        <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Role</th>
                        <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="user in filteredUsers" :key="user.id">
                        <td class="px-6 py-4 text-sm text-gray-700">{{ user.first_name + ' ' + user.last_name }}</td>
                        <td class="px-6 py-4 text-sm text-gray-700">{{ user.email }}</td>
                        <td class="px-6 py-4 text-sm text-gray-700">{{ user.role }}</td>
                        <td class="px-6 py-4">
                            <button @click="editUser(user.id)" class="text-green-600 hover:text-green-800 mr-4">Edit</button>
                            <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-800">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="p-6 text-center" v-else>
        <h3>There are no users yet.</h3>
    </div>
</template>
