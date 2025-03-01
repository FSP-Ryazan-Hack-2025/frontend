'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import { useGetAvatar } from '../hooks';
import Link from 'next/link';
import { useStore } from '@/shared/store';

export const UserAvatar = () => {
    const { data, isLoading } = useGetAvatar();
    const userData = useStore(state => state.userData);

    return (
        <Link href='/profile'>
            <Avatar className='h-9 w-9 cursor-pointer transition-transform hover:scale-110'>
                {isLoading ? (
                    <AvatarFallback>...</AvatarFallback>
                ) : (
                    <>
                        {data && data !== 'static/avatars/47299757.webp' ? (
                            <AvatarImage src={data} alt='Пользователь' />
                        ) : (
                            <AvatarFallback>
                                {userData?.name[0].toUpperCase() || 'П'}
                            </AvatarFallback>
                        )}
                    </>
                )}
            </Avatar>
        </Link>
    );
};
