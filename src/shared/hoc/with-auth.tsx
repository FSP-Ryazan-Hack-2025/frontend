'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { api } from '@/shared/api';
import { User } from '@/entities/user/model';
import { useStore } from '../store';

export function withAuth<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    return function ProtectedComponent(props: P) {
        const router = useRouter();
        const pathName = usePathname();
        const setUserData = useStore(state => state.setUserData);
        const authorized = useStore(state => state.authorized);
        const setAuthorized = useStore(state => state.setAuthorized);

        useEffect(() => {
            const checkAuth = async () => {
                const accessToken = localStorage.getItem('access_token');

                if (!accessToken) {
                    if (pathName !== '/') router.replace('/sign-in');
                    return;
                }

                try {
                    if (!authorized) {
                        const { data } = await api.get<User>('/user/self');
                        setUserData(data);
                        setAuthorized(true);
                    }
                } catch (error) {
                    console.log('Ошибка проверки токена:', error);

                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    if (pathName !== '/') router.replace('/sign-in');
                }
            };

            checkAuth();
        }, [authorized, pathName, router, setUserData, setAuthorized]);

        if (!authorized && pathName !== '/') return null;

        return <WrappedComponent {...props} />;
    };
}
