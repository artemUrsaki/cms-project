<script setup lang="ts">
import AdminNavLink from '@/components/AdminNavLink.vue';
import { RouterView } from 'vue-router';
</script>

<template>
    <div class="flex flex-1 self-stretch">
        <!-- Sidebar -->
        <div class="bg-green-100 w-64 p-4 border-r border-green-200">
            <h2 class="text-lg font-semibold mb-6 text-green-800">Navigation</h2>
            <nav class="space-y-2">
                <AdminNavLink routeName = "users">
                    Users
                </AdminNavLink>
                <AdminNavLink routeName = "conferences">
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
