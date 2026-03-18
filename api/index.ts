import { keycloak } from '@/components/Providers';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}`,
  // baseURL: 'http://192.168.0.107:8080',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshed = await keycloak?.updateToken(5);
        if (refreshed) {
          if (keycloak?.token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + keycloak.token;
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // keycloak.logout(); // Optional: logout the user if refresh fails
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
