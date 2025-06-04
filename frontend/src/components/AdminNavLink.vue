<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{ routeName: string }>();
</script>

<template>
    <RouterLink 
        :to="{ name: routeName }"
        class="block w-full px-4 py-2 text-left rounded-lg hover:bg-[#fb6c11]/20 hover:text-[#fb6c11] transition-colors"
        activeClass="block w-full px-4 py-2 text-left rounded-lg bg-[#fb6c11]/30 text-[#fb6c11] font-semibold transition-colors"
    >
        <slot />
    </RouterLink>
</template>
