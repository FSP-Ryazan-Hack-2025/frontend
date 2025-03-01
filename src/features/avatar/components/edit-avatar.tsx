'use client';

import { useStore } from '@/shared/store';
import { Avatar, AvatarFallback, AvatarImage, Input, Label } from '@/shared/ui';
import { Camera } from 'lucide-react';
import { useAddAvatar } from '../hooks/use-add-avatar';
import { useState } from 'react';
import { User } from '@/entities/user';

export function EditAvatar({ userData }: { userData: User }) {
    const avatar = useStore(state => state.avatar);
    const [isUploading, setIsUploading] = useState(false);

    const { mutate } = useAddAvatar();

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        const formData = new FormData();
        formData.append('avatar', file);

        mutate(formData, {
            onSuccess: () => setIsUploading(false),
            onError: () => setIsUploading(false)
        });
    };

    return (
        <div className='group relative mb-4'>
            <Avatar className='h-32 w-32'>
                <AvatarImage src={avatar} alt='Фото профиля' />
                <AvatarFallback className='text-2xl'>
                    {userData.name.charAt(0) + ' ' + userData.surname.charAt(0)}
                </AvatarFallback>
            </Avatar>
            <div className='absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100'>
                <Label htmlFor='avatar-upload' className='cursor-pointer'>
                    {isUploading ? (
                        <span className='text-white'>Загрузка...</span>
                    ) : (
                        <Camera className='h-8 w-8 text-white' />
                    )}
                    <span className='sr-only'>Изменить аватар</span>
                </Label>
                <Input
                    id='avatar-upload'
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleAvatarChange}
                    disabled={isUploading}
                />
            </div>
        </div>
    );
}
