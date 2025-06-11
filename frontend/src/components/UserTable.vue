<script setup lang="ts">
import { ref, computed } from 'vue';
import LoadingModal from './LoadingModal.vue';
import type { User } from '@/types/types';

const props = defineProps<{
    users: User[];
    fetchingUsers: boolean;
}>();

const searchQuery = ref('');

const filteredUsers = computed(() => {
    return props.users.filter(user =>
        user.first_name.toLowerCase().startsWith(searchQuery.value.toLowerCase()) ||
        user.last_name.toLowerCase().startsWith(searchQuery.value.toLowerCase()) ||
        user.email.toLowerCase().startsWith(searchQuery.value.toLowerCase()))
});
</script>

<template>
    <div class="p-6">
        <div class="bg-white rounded-lg border border-primary/20 relative min-h-40">
            <LoadingModal class="rounded-lg" v-if="props.fetchingUsers" />

            <div v-else-if="props.users.length > 0">
                <div class="p-4 border-b border-primary/20">
                    <input
                        type="text"
                        placeholder="Search users..."
                        class="w-full px-4 py-2 border border-primary rounded-lg   focus:border-secondary"
                        v-model="searchQuery"
                    >
                </div>

                <table class="w-full">
                    <thead class="bg-primary/10">
                        <tr class="text-left">
                            <th class="px-6 py-3 text-sm font-medium text-primary">Full Name</th>
                            <th class="px-6 py-3 text-sm font-medium text-primary">Email</th>
                            <th class="px-6 py-3 text-sm font-medium text-primary">Role</th>
                            <th class="px-6 py-3 text-sm font-medium text-primary">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-primary/10">
                        <tr v-for="user in filteredUsers" :key="user.id">
                            <td class="px-6 py-4 text-sm text-primary">{{ user.first_name + ' ' + user.last_name }}</td>
                            <td class="px-6 py-4 text-sm text-primary">{{ user.email }}</td>
                            <td class="px-6 py-4 text-sm text-primary">
                                <div class="flex flex-wrap gap-2">
                                    <span class="px-2 py-1 text-xs bg-secondary/10 text-secondary rounded-full">
                                        {{ user.role.charAt(0).toUpperCase() + user.role.slice(1) }}
                                    </span>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <button @click="$emit('edit', user)" class="text-secondary hover:text-primary mr-4">Edit</button>
                                <button @click="$emit('delete', user.id)" class="text-red-600 hover:text-red-800">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="p-6 text-center" v-else>
                <h3 class="text-primary">There are no users yet.</h3>
            </div>
        </div>
    </div>
</template>
