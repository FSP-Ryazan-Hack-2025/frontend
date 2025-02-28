import { User } from '@/entities/user/model';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Store {
    userData: User | null;
    authorized: boolean;
    setAuthorized: (value: boolean) => void;
    setUserData: (user: User | null) => void;
}

export const useStore = create<Store>()(
    devtools(set => ({
        userData: null,
        authorized: false,

        setAuthorized: (value: boolean) =>
            set(state => ({ ...state, authorized: value })),

        setUserData: (userData: User | null) =>
            set(state => ({ ...state, userData }))
    }))
);
