<script setup lang="ts">
import { onMounted, reactive, useTemplateRef } from 'vue'
import LoadingModal from './LoadingModal.vue'
import type { User, ValidationError } from '@/types/types'

const props = defineProps<{
    user: User | null
    roles: string[]
    loadingUser: boolean
    errors: ValidationError | null
}>()

const modalForm = reactive({
    first_name: props.user?.first_name || '',
    last_name: props.user?.last_name || '',
    email: props.user?.email || '',
    role: props.user?.role || 'editor'
})
const input = useTemplateRef<HTMLInputElement>('focus-input')

onMounted(() => {
    input.value?.focus()
})
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-[1001]">
        <div @click="$emit('close')" class="absolute top-0 bottom-0 left-0 right-0"></div>
        <div class="bg-white p-6 rounded-lg w-96 z-[1002] relative">
            <LoadingModal class="rounded-lg" v-if="loadingUser" />

            <form @submit.prevent="$emit('save', modalForm)" class="space-y-4">
                <h3 class="text-lg font-semibold mb-4 text-center text-primary">User</h3>
                <p v-if="errors?.first_name" class="mb-1 text-red-500">{{ errors?.first_name[0] }}</p>
                <input
                    ref="focus-input"
                    v-model="modalForm.first_name"
                    placeholder="First Name"
                    class="w-full mb-4 px-4 py-2 border border-primary rounded-lg  focus:border-secondary"
                />
                <p v-if="errors?.last_name" class="mb-1 text-red-500 ">{{ errors?.last_name[0] }}</p>
                <input
                    v-model="modalForm.last_name"
                    placeholder="Last Name"
                    class="w-full mb-4 px-4 py-2 border border-primary rounded-lg  focus:border-secondary"
                />
                <p v-if="errors?.email" class="mb-1 text-red-500">{{ errors?.email[0] }}</p>
                <input
                    v-model="modalForm.email"
                    placeholder="User Email"
                    class="w-full mb-4 px-4 py-2 border border-primary rounded-lg  focus:border-secondary"
                />
                <p v-if="errors?.role" class="mb-1 text-red-500">{{ errors?.role[0] }}</p>
                <select v-model="modalForm.role" placeholder="Select Role" class="mb-4 w-full px-2 py-2 border border-primary rounded-lg  focus:border-secondary">
                    <option v-for="(role, id) in roles" :key='id' :value="role">
                        {{ role.charAt(0).toUpperCase() + role.slice(1) }}
                    </option>
                </select>
                <div class="flex justify-end space-x-3">
                    <button type="button" @click="$emit('close')" class="px-4 py-2 text-primary hover:text-secondary">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary hover:text-white transition-colors">
                        {{ user ? 'Save' : 'Add'}}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
