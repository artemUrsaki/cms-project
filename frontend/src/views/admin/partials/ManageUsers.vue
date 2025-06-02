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
    <div class="border-b border-[#566d8b]/20 p-4 bg-white">
        <div class="flex justify-between items-center">
            <h1 class="text-xl font-semibold text-[#566d8b]">User Management</h1>
            <button @click="adminUserStore.toggleModal" class="bg-[#fb6c11] text-white px-4 py-2 rounded-lg hover:bg-[#566d8b] transition-colors">
                Add User
            </button>
        </div>
    </div>

    <UserTable />

    <!-- Add/Edit Modal -->
    <UserModal v-if="adminUserStore.userModal" />
</template>
