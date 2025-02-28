'use client';

import { useStore } from '@/shared/store';
import { buttonVariants, ToggleTheme } from '@/shared/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
    const { authorized } = useStore();
    const pathName = usePathname();

    if (pathName === '/sign-in' || pathName === '/sign-up' || pathName === '/profile') {
        return null;
    }

    return (
        <div className='mb-2 flex items-center justify-between border-b border-neutral-200 py-4 dark:border-neutral-700'>
            <h1 className='text-4xl font-bold'>Logo</h1>
            <div className='flex gap-4'>
                <ToggleTheme />
                {!authorized ? (
                    <Link href='/sign-in' className={buttonVariants()}>
                        Войти
                    </Link>
                ) : (
                    <Link href='/profile' className={buttonVariants()}>
                        Профиль
                    </Link>
                )}
            </div>
        </div>
    );
}
