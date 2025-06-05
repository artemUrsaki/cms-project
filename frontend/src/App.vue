<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import LoadingModal from './components/LoadingModal.vue';
import { RouterLink, RouterView } from 'vue-router';
import { useUserStore } from '@/stores/user';
import SubpageSidebar from './components/SubpageSidebar.vue';

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

    <LoadingModal v-else-if="userStore.loading" />

    <div v-if="!init" class="flex min-h-screen">
        <!-- Sidebar on the left -->
        <div class="w-64 fixed top-0 left-0 bottom-0 z-40">
            <SubpageSidebar />
        </div>

        <!-- Main site content shifted to the right of the sidebar -->
        <div class="flex-1 flex flex-col ml-64 min-h-screen bg-gray-100">
            <!-- Header -->
            <header class="fixed w-[calc(100%-16rem)] top-0 left-64 bg-white shadow-sm z-30">
                <div class="w-full px-4 flex justify-between items-center h-[70px]">
                    <div class="logo">
                        <RouterLink to="/">
                            <img src="./assets/images/logo.png" alt="Logo" class="h-12">
                        </RouterLink>
                    </div>

                    <nav class="flex items-center gap-5">
                        <template v-if="userStore.isLoggedIn">
                            <button @click="userStore.logout">Log Out</button>
                            <RouterLink to="/profile">Profile</RouterLink>
                            <RouterLink v-if="userStore.isAdmin" to="/admin" class="text-black">Admin</RouterLink>
                        </template>

                        <template v-else>
                            <RouterLink to="/login">Log In</RouterLink>
                        </template>
                    </nav>
                </div>
            </header>

            <!-- Main content -->
            <main class="flex-1 pt-[90px] px-6">
                <RouterView />
            </main>

            <!-- Footer -->
            <footer class="bg-gray-800 text-white py-6 mt-auto">
                <p>&copy; 2025 Miloš Chmelko, Andrej Mika, Patrik Rajnoha, Artem Ursaki.</p>
            </footer>
        </div>
    </div>
</template>
