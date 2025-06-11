<script setup lang="ts">
import ProfileEdit from '@/components/ProfileEdit.vue'
import ProfilePassword from '@/components/ProfilePassword.vue'
import { useUserStore } from '@/stores/user'
import { useErrorStore } from '@/stores/error'
import { onBeforeMount, ref } from 'vue'

const userStore = useUserStore()
const errorStore = useErrorStore()

const message = ref('')
const passwordMessage = ref('')

async function handleUpdate(userData: { first_name: string; last_name: string; email: string }) {
    await userStore.updateUserDetails(userData)

    if (!errorStore.errors) {
        message.value = 'Profile updated successfully!'
    } else {
        message.value = ''
    }
}

async function handlePasswordUpdate(passwordData: { current_password: string; password: string; password_confirmation: string }) {
    await userStore.updatePassword(passwordData)

    if (!errorStore.errors) {
        passwordMessage.value = 'Password updated successfully!'
    } else {
        passwordMessage.value = ''
    }
}

onBeforeMount(() => { 
    message.value = ''
    passwordMessage.value = ''
    errorStore.clearErrors()
})
</script>

<template>
    <div class="p-6 bg-white shadow-md rounded-lg border border-primary/20">
        <h1 class="text-3xl font-bold mb-6 text-primary">Account Settings</h1>

        <div class="flex gap-6">
            <ProfileEdit
                class="flex-1"
                :user="userStore.user" 
                :error="errorStore.errors" 
                :message="message"
                @update="handleUpdate" 
            />
            <ProfilePassword
                class="flex-1"
                :message="passwordMessage"
                :error="errorStore.errors" 
                @update="handlePasswordUpdate"
            />
        </div> 
    </div>
</template>