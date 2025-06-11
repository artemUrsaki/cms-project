<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{ routeName: string }>();
</script>

<template>
    <RouterLink 
        :to="{ name: routeName }"
        class="block w-full px-4 py-2 text-left rounded-lg hover:bg-secondary/20 hover:text-secondary transition-colors"
        activeClass="block w-full px-4 py-2 text-left rounded-lg bg-secondary/30 text-secondary font-semibold transition-colors"
    >
        <slot />
    </RouterLink>
</template>
