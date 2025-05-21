<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
    <div>
        <h1>User Profile</h1>
    
        <p>User Name: {{ userStore.name }}</p>
        <p>User Email: {{ userStore.email }}</p>
    </div>
</template>