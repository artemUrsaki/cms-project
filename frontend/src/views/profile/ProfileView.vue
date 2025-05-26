<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
    <div>
        <h1>User Profile</h1>
    
        <p>User Name: {{ userStore.user?.first_name + ' ' + userStore.user?.last_name }}</p>
        <p>User Email: {{ userStore.user?.email }}</p>
    </div>
</template>