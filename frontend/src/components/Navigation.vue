<script setup lang="ts">
import NavLink from '@/components/NavLink.vue';

const props = defineProps<{
  title: string
  navLinks: { routeName: string; label: string }[]
}>();
</script>

<template>
  <div class="bg-primary/20 w-64 p-4 border-r border-primary/20">
      <h2 class="text-lg font-semibold mb-6 text-primary">{{ title }}</h2>
      <nav class="space-y-2">
          <NavLink
            v-for="link in props.navLinks"
            :key="link.routeName"
            :routeName="link.routeName"
            class="hover:text-secondary text-primary"
          >
            {{ link.label }}
          </NavLink>
      </nav>
  </div>
</template>