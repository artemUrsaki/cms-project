<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { RouterView } from 'vue-router';
</script>

<template>
    <div class="flex flex-1 self-stretch rounded-xl overflow-hidden">
        <Navigation 
            :navLinks="[
                { routeName: 'profile.details', label: 'Profile Details' },
                { routeName: 'profile.settings', label: 'Account Settings' }
            ]"
            title="Profile Management" 
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