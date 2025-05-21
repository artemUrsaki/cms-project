<script setup>
// import axios from 'axios';
// import { ref } from 'vue';

// const props = defineProps(['toggleModal', 'fetchUsers']);

// const user = ref({});

// function addUser() {
//     axios.postForm(route('admin.users.store'), user.value)
//     .then(() => {
//         props.fetchUsers()
//         props.toggleModal()
//     });
// }
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1001]">
        <div @click="toggleModal()" class="absolute top-0 bottom-0 left-0 right-0"></div>
        <div class="bg-white p-6 rounded-lg w-96 z-[1002]">
            <form @submit.prevent="addUser()">
                <h3 class="text-lg font-semibold mb-4 text-center">User</h3>
                <input
                    v-model="user.name"
                    placeholder="User Name"
                    class="w-full mb-4 px-4 py-2 border rounded-lg"
                />
                <input
                    v-model="user.email"
                    placeholder="User Email"
                    class="w-full mb-4 px-4 py-2 border rounded-lg"
                />
                <input
                    v-model="user.password"
                    placeholder="User Password"
                    class="w-full mb-4 px-4 py-2 border rounded-lg"
                />
                <!-- <select v-model="userModel.role" placeholder="Select Role" class="mb-4">
                    <option v-for="role in roles" :key='role.id' :value="role">
                        {{ role.name }}
                    </option>
                </select> -->
                <div class="flex justify-end space-x-3">
                    <button type="button" @click.prevent="toggleModal()" class="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
