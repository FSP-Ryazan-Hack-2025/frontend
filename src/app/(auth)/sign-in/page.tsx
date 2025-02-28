import { LoginForm } from '@/features/auth/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Авторизация',
};

export default function SignIn() {
    return <LoginForm />;
}
