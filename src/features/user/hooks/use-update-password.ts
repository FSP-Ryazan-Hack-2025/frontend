import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/shared/api';

export interface SuccessResponse {
    success: string;
}

export function useUpdatePassword() {
    return useMutation({
        mutationFn: async (new_password: string) => {
            const response = await api.post<SuccessResponse>(
                `/user/edit_password?new_password=${encodeURIComponent(new_password)}`
            );
            return response.data;
        },
        onSuccess: data => {
            if (data.success === 'ok') {
                toast.success('Пароль успешно обновлен!');
            }
        },
        onError: () => {
            toast.error('Ошибка обновления пароля. Попробуйте снова.');
        }
    });
}
