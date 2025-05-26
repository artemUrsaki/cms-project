<script setup lang="ts">
import LoadingModal from './components/LoadingModal.vue';
import { RouterLink, RouterView } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { onBeforeMount, ref } from 'vue';

const userStore = useUserStore();
const init = ref(true);

onBeforeMount(async () => {
    await userStore.initAuth();
    init.value = false;
});
</script>

<template>
    <div v-if="init" class="min-h-screen w-full flex flex-col justify-center items-center">
        <img src="./assets/images/logo.png" class="h-40">
        <h1>Animal Science Days</h1>
    </div>

    <LoadingModal v-if="userStore.loading" />

    <div v-if="!init" class="flex flex-col min-h-screen bg-gray-100">
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

                        <RouterLink v-if="userStore.isAdmin" to="admin" class="text-black">Admin</RouterLink>
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