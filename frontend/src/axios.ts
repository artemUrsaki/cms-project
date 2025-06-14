import axios from 'axios'
import { useUserStore } from './stores/user'
import { useErrorStore } from './stores/error'
import router from './router';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'Accept': 'application/json'
    }
});

axiosInstance.interceptors.response.use(response => {
    const errorStore = useErrorStore()
    if (errorStore.errors) {
        errorStore.clearErrors();
    }
    return response;
},
async error => {
    const userStore = useUserStore()
    const errorStore = useErrorStore()
    const currentRoute = router.currentRoute.value;
    switch (error.response.status) {
        case 419:
            console.log('Session expired, logging out user')
        case 401:
            if (currentRoute.name !== 'login' && currentRoute.name !== 'password-reset') {
                userStore.cleanAuth()
                router.push({ name: 'login', query: { redirect: currentRoute.fullPath } });
            }
            break;
        case 422:
            errorStore.setValidationErrors(error);
            break;
        default:
            console.error('An unexpected error occurred:', error);
    }
    return Promise.reject(error);
});

export default axiosInstance