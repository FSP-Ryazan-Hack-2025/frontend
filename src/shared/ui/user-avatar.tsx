'use client';

import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { useStore } from '@/shared/store';
import Link from 'next/link';

export const UserAvatar = () => {
    const userData = useStore(state => state.userData);

    return (
        <Link href='/profile'>
            <Avatar className='h-9 w-9 cursor-pointer transition-transform hover:scale-110'>
                <AvatarFallback>
                    {userData?.name[0].toUpperCase() || 'П'}
                </AvatarFallback>
            </Avatar>
        </Link>
    );
};
