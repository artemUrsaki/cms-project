<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { RouterView } from 'vue-router';
</script>

<template>
    <div class="flex flex-1 self-stretch rounded-xl overflow-hidden">
        <Navigation 
            :navLinks="[
                { routeName: 'admin.users', label: 'Manage Users' },
                { routeName: 'admin.conferences', label: 'Manage Conferences' }
            ]" 
            title="Admin Dashboard" 
        />

        <div class="flex-1 bg-white">
            <div class="p-6">
                <RouterView v-slot="{ Component}">
                    <KeepAlive>
                        <component :is="Component"/>
                    </KeepAlive>
                </RouterView>
            </div>
        </div>
    </div>
</template>