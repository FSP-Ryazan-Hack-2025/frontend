import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/shared/api';
import { useStore } from '@/shared/store';
import { UpdateProfileSchemaType } from '../schemes';
import { User } from '@/entities/user';

export function useUpdateProfile() {
    const setUserData = useStore(state => state.setUserData);

    return useMutation({
        mutationFn: async (data: UpdateProfileSchemaType) => {
            const response = await api.put<User>('/user/edit', data);
            return response.data;
        },
        onSuccess: data => {
            setUserData(data);
            toast.success('Данные успешно обновлены!');
        },
        onError: () => {
            toast.error('Ошибка обновления данных. Попробуйте снова.');
        }
    });
}
