import { z } from 'zod';

export const profileSchema = z.object({
    name: z.string().min(1, {
        message: 'Введите имя'
    }),
    surname: z.string().min(1, {
        message: 'Введите фамилию'
    }),
    patronymic: z.string().min(1, {
        message: 'Введите отчество'
    })
});

export type UpdateProfileSchemaType = z.infer<typeof profileSchema>;
