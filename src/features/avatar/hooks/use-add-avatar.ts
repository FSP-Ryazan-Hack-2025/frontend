import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAvatar, getAvatar } from '../api'; // Функция для получения URL аватара
import { useStore } from '@/shared/store';
import { toast } from 'sonner';

export const useAddAvatar = () => {
    const queryClient = useQueryClient();
    const setAvatar = useStore(state => state.setAvatar);

    return useMutation({
        mutationFn: addAvatar,
        onSuccess: async () => {
            const newAvatar = await getAvatar();
            if (newAvatar) {
                setAvatar(newAvatar);
            }

            queryClient.invalidateQueries({ queryKey: ['avatar'] });
        },
        onError: error => {
            console.log('Ошибка загрузки аватара:', error);
            toast.error('Ошибка загрузки аватара. Попробуйте снова.');
        }
    });
};
