<script setup lang="ts">
import ProfileEdit from '@/components/ProfileEdit.vue';
import ProfilePassword from '@/components/ProfilePassword.vue';

</script>

<template>
    <div class="p-6 bg-white shadow-md rounded-lg border border-[#566d8b]/20">
        <h1 class="text-3xl font-bold mb-6 text-[#566d8b]">Account Settings</h1>

        <ProfileEdit />
        
        <ProfilePassword />
        
    </div>
</template>