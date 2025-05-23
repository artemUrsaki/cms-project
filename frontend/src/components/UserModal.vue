<script setup lang="ts">
import { onMounted, reactive, useTemplateRef } from 'vue';
import { useAdminUserStore } from '@/stores/adminUser';

const props = defineProps(['toggleModal'])
const adminUserStore = useAdminUserStore()

const user = reactive({
    first_name: '',
    last_name: '',
    email: '',
    role: ''
})
const input = useTemplateRef('focus-input')

onMounted(() => {
    input.value?.focus()
})

function createUser() {
    adminUserStore.create(user)
    props.toggleModal()
    adminUserStore.fetch()
}
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-[1001]">
        <div @click="toggleModal()" class="absolute top-0 bottom-0 left-0 right-0"></div>
        <div class="bg-white p-6 rounded-lg w-96 z-[1002]">
            <form @submit.prevent="createUser">
                <h3 class="text-lg font-semibold mb-4 text-center">User</h3>
                <input
                    ref="focus-input"
                    v-model="user.first_name"
                    placeholder="First Name"
                    class="w-full mb-4 px-4 py-2 border rounded-lg"
                />
                <input
                    v-model="user.last_name"
                    placeholder="Last Name"
                    class="w-full mb-4 px-4 py-2 border rounded-lg"
                />
                <input
                    v-model="user.email"
                    placeholder="User Email"
                    class="w-full mb-4 px-4 py-2 border rounded-lg"
                />
                <select v-model="user.role" placeholder="Select Role" class="mb-4">
                    <option v-for="(role, id) in adminUserStore.roles" :key='id' :value="role">
                        {{ role }}
                    </option>
                </select>
                <div class="flex justify-end space-x-3">
                    <button type="button" @click.prevent="toggleModal()" class="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
