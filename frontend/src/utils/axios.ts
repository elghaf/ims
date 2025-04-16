import axios from "axios";
import { getCookie, deleteCookie } from 'cookies-next';

const instance = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

// Add token to all requests
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            // Make sure token is properly formatted with Bearer prefix
            config.headers.Authorization = `Bearer ${token}`;
            // Add debugging
            console.log(`Request to ${config.url}: Adding token to headers`);
        } else {
            console.log(`Request to ${config.url}: No token found in localStorage`);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle auth errors
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !window.location.pathname.includes('/auth/')) {
            // Clear auth data
            localStorage.removeItem("access_token");
            deleteCookie('access_token');
            
            // Store the current path for redirect after login
            const currentPath = window.location.pathname;
            const loginUrl = `/auth/login?from=${encodeURIComponent(currentPath)}`;
            
            // Use router.push instead of window.location for smoother navigation
            window.location.replace(loginUrl);
            return new Promise(() => {});
        }
        return Promise.reject(error);
    }
);

export default instance;
