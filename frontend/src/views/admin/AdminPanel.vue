<script setup lang="ts">
import AdminNavLink from '@/components/AdminNavLink.vue';
import { RouterView } from 'vue-router';
</script>

<template>
    <div class="flex flex-1 self-stretch rounded-xl overflow-hidden">
        <!-- Sidebar -->
        <div class="bg-[#566d8b]/20 w-64 p-4 border-r border-[#566d8b]/20">
            <h2 class="text-lg font-semibold mb-6 text-[#566d8b]">Navigation</h2>
            <nav class="space-y-2">
                <AdminNavLink routeName="users" class="hover:text-[#fb6c11] text-[#566d8b]">
                    Users
                </AdminNavLink>
                <AdminNavLink routeName="conferences" class="hover:text-[#fb6c11] text-[#566d8b]">
                    Conferences
                </AdminNavLink>
            </nav>
        </div>

        <!-- Main Content -->
        <div class="flex-1 bg-white">
            <div class="p-6">
                <RouterView />
            </div>
        </div>
    </div>
</template>
