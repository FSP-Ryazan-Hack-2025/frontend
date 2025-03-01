'use client';

import { UserAvatar } from '@/features/avatar/components';
import { useStore } from '@/shared/store';
import {
    Button,
    buttonVariants,
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
    ToggleTheme
} from '@/shared/ui';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
    const { authorized } = useStore();
    const pathName = usePathname();

    if (pathName === '/sign-in' || pathName === '/sign-up') return null;

    return (
        <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div className='container flex h-16 items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Sheet>
                        <SheetTrigger asChild className='md:hidden'>
                            <Button
                                variant='outline'
                                size='icon'
                                className='mr-2'
                            >
                                <Menu className='h-5 w-5' />
                                <span className='sr-only'>Меню</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side='left'>
                            <SheetTitle className='sr-only'>
                                Навигация
                            </SheetTitle>
                            <nav className='mt-8 flex flex-col gap-4'>
                                <Link
                                    href='/'
                                    className='text-lg font-medium hover:underline'
                                >
                                    Главная
                                </Link>
                                <Link
                                    href='#features'
                                    className='text-lg font-medium hover:underline'
                                >
                                    Особенности
                                </Link>
                                <Link
                                    href='/technologies'
                                    className='text-lg font-medium hover:underline'
                                >
                                    Технологии
                                </Link>
                                <Link
                                    href='/about'
                                    className='text-lg font-medium hover:underline'
                                >
                                    О проекте
                                </Link>
                                <Link
                                    href='/profile'
                                    className='text-lg font-medium hover:underline'
                                >
                                    Профиль
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <Link href='/' className='flex items-center space-x-2'>
                        <span className='flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground'>
                            П
                        </span>
                        <span className='hidden text-xl font-bold sm:inline-block'>
                            Проект
                        </span>
                    </Link>

                    <nav className='ml-6 hidden items-center gap-6 md:flex'>
                        <Link
                            href='/'
                            className='text-sm font-medium underline-offset-4 hover:underline'
                        >
                            Главная
                        </Link>
                        <Link
                            href='/about'
                            className='text-sm font-medium underline-offset-4 hover:underline'
                        >
                            О проекте
                        </Link>
                    </nav>
                </div>

                <div className='flex items-center gap-2'>
                    <ToggleTheme />

                    {authorized ? (
                        <UserAvatar />
                    ) : (
                        <Link
                            href='/sign-in'
                            className={buttonVariants({
                                variant: 'ghost'
                            })}
                        >
                            Войти
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
