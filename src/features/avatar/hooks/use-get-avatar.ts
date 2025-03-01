import { useQuery } from '@tanstack/react-query';
import { getAvatar } from '../api';

export const useGetAvatar = () => {
    return useQuery({
        queryKey: ['avatar'],
        queryFn: getAvatar,
        staleTime: 1000 * 60 * 5
    });
};
