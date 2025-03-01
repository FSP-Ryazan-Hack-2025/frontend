import { z } from 'zod';

export const profileSchema = z.object({
    name: z.string().min(1, {
        message: 'Введите имя'
    }),
    surname: z.string().min(1, {
        message: 'Введите фамилию'
    }),
    gender: z.enum(['male', 'female'], {
        message: 'Некорректный пол'
    })
});

export type UpdateProfileSchemaType = z.infer<typeof profileSchema>;
