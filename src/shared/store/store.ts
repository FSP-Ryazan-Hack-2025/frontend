import { User } from '@/entities/user/model';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Store {
    userData: User | null;
    avatar: string;
    authorized: boolean;
    setAuthorized: (value: boolean) => void;
    setUserData: (user: User | null) => void;
    setAvatar: (avatar: string) => void;
}

export const useStore = create<Store>()(
    devtools(set => ({
        userData: null,
        avatar: '',
        authorized: false,

        setAuthorized: (value: boolean) =>
            set(state => ({ ...state, authorized: value })),

        setUserData: (userData: User | null) =>
            set(state => ({ ...state, userData })),

        setAvatar: (avatar: string) => set(state => ({ ...state, avatar }))
    }))
);
