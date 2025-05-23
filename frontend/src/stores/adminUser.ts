import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

interface User {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
}

interface Role {
    name: string
}

export const useAdminUserStore = defineStore('adminUser', () => {
    const users = ref([] as User[])
    const roles = ref([] as Role[])

    async function fetch() {
        try {
            const { data } = await axios.get('api/users')
            users.value = data
        } catch(e) {
            console.log(e)
        }
    }

    async function fetchRoles() {
        try {
            const { data } = await axios.get('api/roles')
            roles.value = data
        } catch(e) {
            console.log(e)
        }
    }

    async function create(user: User) {
        try {
            await axios.post('api/users', user)
        } catch (e) {
            console.log(e)
        }
    }

    return {
        users,
        roles,
        fetch,
        create,
        fetchRoles
    }
})