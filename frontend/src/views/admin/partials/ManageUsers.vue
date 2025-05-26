<script setup lang="ts">
import UserTable from '@/components/UserTable.vue'
import UserModal from '@/components/UserModal.vue'
import { onBeforeMount, ref } from 'vue'
import { useAdminUserStore } from '@/stores/adminUser'

const adminUserStore = useAdminUserStore()

onBeforeMount(() => {
    adminUserStore.fetch()
    adminUserStore.fetchRoles()
})
</script>

<template>
    <div class="border-b border-gray-200 p-4 bg-white">
        <div class="flex justify-between items-center">
            <h1 class="text-xl font-semibold text-gray-800">User Management</h1>
            <button @click="adminUserStore.toggleModal" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Add User
            </button>
        </div>
    </div>

    <UserTable />

    <!-- Add/Edit Modal -->
    <UserModal v-if="adminUserStore.userModal" />
</template>
