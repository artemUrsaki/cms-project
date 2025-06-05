<script setup lang="ts">
import ProfileEdit from '@/components/ProfileEdit.vue';
import ProfilePassword from '@/components/ProfilePassword.vue';
import { useUserStore } from '@/stores/user';
import { useErrorStore } from '@/stores/error';
import { ref } from 'vue';

const userStore = useUserStore();
const errorStore = useErrorStore();

const message = ref('')

async function handleUpdate(userData: { first_name: string; last_name: string; email: string }) {
    await userStore.updateUserDetails(userData)

    if (!errorStore.errors) {
        message.value = 'Profile updated successfully!'
    } else {
        message.value = ''
    }
}
</script>

<template>
    <div class="p-6 bg-white shadow-md rounded-lg border border-[#566d8b]/20">
        <h1 class="text-3xl font-bold mb-6 text-[#566d8b]">Account Settings</h1>

        <ProfileEdit
            :user="userStore.user" 
            :error="errorStore.errors" 
            :message="message"
            @update="handleUpdate" 
        />
        <ProfilePassword />
        
    </div>
</template>