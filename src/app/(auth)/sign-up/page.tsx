import { RegisterForm } from '@/features/auth/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Регистрация',
};

export default function SignUp() {
    return <RegisterForm />;
}
