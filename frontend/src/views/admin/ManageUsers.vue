<script setup lang="ts">
import UserTable from '@/components/UserTable.vue'
import UserModal from '@/components/UserModal.vue'
import { onBeforeMount } from 'vue'
import { useAdminUserStore } from '@/stores/adminUser'
import { useErrorStore } from '@/stores/error'
import type { UserInput } from '@/types/types'

const adminUserStore = useAdminUserStore()
const errorStore = useErrorStore()

onBeforeMount(() => {
    adminUserStore.fetch()
    adminUserStore.fetchRoles()
})

async function handleSave(user: UserInput) {
    if (adminUserStore.editingUser) {
        await adminUserStore.update(adminUserStore.editingUser.id, user)
    } else {
        await adminUserStore.create(user)
    }

    if (!errorStore.errors) {
        adminUserStore.toggleModal()
    }
}

function handleToggleModal() {
    if (errorStore.errors) {
        errorStore.clearErrors()
    }
    adminUserStore.toggleModal()
}
</script>

<template>
    <div class="border-b border-[#566d8b]/20 p-4 bg-white">
        <div class="flex justify-between items-center">
            <h1 class="text-xl font-semibold text-[#566d8b]">User Management</h1>
            <button @click="handleToggleModal" class="bg-[#fb6c11] text-white px-4 py-2 rounded-lg hover:bg-[#566d8b] transition-colors">
                Add User
            </button>
        </div>
    </div>

    <UserTable 
        :users="adminUserStore.users" 
        :fetchingUsers="adminUserStore.fetching"
        @edit="adminUserStore.toggleModal"
        @delete="adminUserStore.destroy" 
    />

    <!-- Add/Edit Modal -->
    <UserModal
        v-if="adminUserStore.userModal" 
        :user="adminUserStore.editingUser"
        :roles="adminUserStore.roles"
        :loadingUser="adminUserStore.loadingUser"
        :errors="errorStore.errors"
        @close="adminUserStore.toggleModal"
        @save="handleSave"
    />
</template>
