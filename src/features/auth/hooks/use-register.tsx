import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { RegisterSchemaType } from '../schemes';
import { api, RegisterResponse } from '@/shared/api';

export function useRegister() {
    const router = useRouter();

    return useMutation({
        mutationFn: async (data: RegisterSchemaType) => {
            const response = await api.post<RegisterResponse>(
                '/user/register',
                {
                    name: data.name,
                    surname: data.surname,
                    email: data.email,
                    gender: data.gender,
                    password: data.password
                }
            );
            return response.data;
        },
        onSuccess: data => {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);

            toast.success('Регистрация успешна!');
            router.push('/');
        },
        onError: () => {
            toast.error('Ошибка регистрации. Попробуйте снова.');
        }
    });
}
