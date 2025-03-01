import { api } from '@/shared/api';

export interface addAvatarResponse {
    success: string;
}

export type getAvatarResponse = string;

export const getAvatar = async () => {
    const response = await api.get<getAvatarResponse>(`/user/avatar`);
    return response.data;
};

export const addAvatar = async (avatar: FormData) => {
    const response = await api.post<addAvatarResponse>(`/user/avatar`, avatar, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    return response.data;
};
