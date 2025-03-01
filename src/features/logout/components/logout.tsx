'use client';

import { useStore } from '@/shared/store';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button
} from '@/shared/ui';
import { useRouter } from 'next/navigation';

export function Logout() {
    const router = useRouter();
    const setUserData = useStore(state => state.setUserData);
    const setAuthorized = useStore(state => state.setAuthorized);

    const handleLogout = async () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        await new Promise(resolve => {
            setUserData(null);
            setAuthorized(false);
            resolve(null);
        });

        router.replace('/');
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant='destructive' className='mt-6 w-full'>
                    Выйти
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Вы уверены, что хотите выйти?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Вам потребуется снова войти в систему для доступа к
                        вашей учетной записи.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>
                        Выйти
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
