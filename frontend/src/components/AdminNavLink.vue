<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{ routeName: string }>();
</script>

<template>
    <RouterLink 
        :to="routeName" 
        class="block w-full px-4 py-2 text-left rounded-lg hover:bg-green-200 transition-colors"
        activeClass="block w-full px-4 py-2 text-left rounded-lg bg-green-200 transition-colors"
    >
        <slot />
    </RouterLink>
</template>
