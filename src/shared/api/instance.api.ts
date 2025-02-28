import axios from 'axios';
import { RefreshResponse } from './types';

export const api = axios.create({
    baseURL:
        process.env.NEXT_PUBLIC_API_URL || 'https://api-hack.energy-cerber.ru',
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (!refreshToken) throw new Error('Нет refresh-токена');

                const refreshResponse = await api.post<RefreshResponse>(
                    '/user/refresh',
                    {
                        refresh_token: refreshToken
                    }
                );

                const { access_token, refresh_token } = refreshResponse.data;

                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);

                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
