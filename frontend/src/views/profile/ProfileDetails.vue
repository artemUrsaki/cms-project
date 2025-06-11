<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
    <div class="p-6 bg-white shadow-md rounded-lg border border-primary/20">
        <h1 class="text-3xl font-bold mb-6 text-primary">Profile Details</h1>

        <div class="mb-4">
            <p class="text-lg text-primary">
                <span class="font-semibold">Name:</span>
                {{ userStore.user?.first_name }} {{ userStore.user?.last_name }}
            </p>
            <p class="text-lg text-primary">
                <span class="font-semibold">Email:</span>
                {{ userStore.user?.email }}
            </p>
        </div>
        </div>
</template>