import { z } from 'zod';

export const PasswordSchema = z
    .object({
        new_password: z.string().min(6, {
            message: 'Пароль минимум 6 символов'
        }),
        confirm_password: z.string().min(6, {
            message: 'Пароль подтверждения минимум 6 символов'
        })
    })
    .refine(data => data.new_password === data.confirm_password, {
        message: 'Пароли не совпадают',
        path: ['confirm_password']
    });

export type UpdatePasswordSchemaType = z.infer<typeof PasswordSchema>;
