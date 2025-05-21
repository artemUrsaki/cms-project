<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { onBeforeMount } from 'vue'

const userStore = useUserStore()

onBeforeMount(async () => {
    axios.get('sanctum/csrf-cookie').then(() => {
      userStore.initialize()
    }).catch(console.log)
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
        <header class="fixed w-full top-0 left-0 bg-white shadow-sm z-50">
            <div class="w-full px-4 flex justify-between items-center">
                <div class="logo">
                    <RouterLink to="/">
                        <img src="./assets/images/logo.png" alt="Logo" class="h-12">
                    </RouterLink>
                </div>


                <nav class="flex items-center gap-5">
                  <!-- If user is logged in -->
                    <template v-if="userStore.isLoggedIn">
                        <button @click="userStore.logout">Log Out</button>
                        <RouterLink to="profile">Profile</RouterLink>

                        <RouterLink v-if="userStore.role == 'admin'" to="admin" class="text-black">Admin</RouterLink>
                    </template>

                  <!-- If user is logged out -->
                    <template v-else>
                        <RouterLink to="login">Log In</RouterLink>
                    </template>
                </nav>

                <!-- TODO: Rocniki sa budu nacitavat s db -->
            </div>
        </header>

        <!-- Page Content -->
        <main class="mt-[70px] p-[20px] flex-1 flex items-center justify-center">
            <RouterView />
        </main>

        <footer class="bg-gray-800 text-white py-6">
            <p>&copy; 2025 Miloš Chmelko, Andrej Mika, Patrik Rajnoha, Artem Ursaki.</p>
        </footer>
    </div>
</template>