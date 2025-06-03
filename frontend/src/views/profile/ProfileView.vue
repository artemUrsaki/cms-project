<script setup lang="ts">
import AdminNavLink from '@/components/AdminNavLink.vue'; // Reusing AdminNavLink for consistent styling
import { RouterView } from 'vue-router';
</script>

<template>
    <div class="flex flex-1 self-stretch rounded-xl overflow-hidden">
        <div class="bg-[#566d8b]/20 w-64 p-4 border-r border-[#566d8b]/20">
            <h2 class="text-lg font-semibold mb-6 text-[#566d8b]">Profile Management</h2>
            <nav class="space-y-2">
                <AdminNavLink routeName="profile-details" class="hover:text-[#fb6c11] text-[#566d8b]">
                    Profile Details
                </AdminNavLink>
                <AdminNavLink routeName="profile-settings" class="hover:text-[#fb6c11] text-[#566d8b]">
                    Account Settings
                </AdminNavLink>
            </nav>
        </div>

        <div class="flex-1 bg-white">
            <div class="p-6">
                <RouterView />
            </div>
        </div>
    </div>
</template>