import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LoginSchemaType } from '../schemes';
import { api, LoginResponse } from '@/shared/api';

export function useLogin() {
    const router = useRouter();

    return useMutation({
        mutationFn: async (data: LoginSchemaType) => {
            const response = await api.post<LoginResponse>('/user/login', data);
            return response.data;
        },
        onSuccess: data => {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);

            toast.success('Вы успешно вошли!');
            router.push('/');
        },
        onError: () => {
            toast.error('Ошибка входа. Проверьте данные.');
        }
    });
}
