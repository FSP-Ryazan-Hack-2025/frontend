import { z } from 'zod';

export const passwordSchema = z
    .object({
        new_password: z.string().min(6, 'Минимальная длина 6 символов'),
        confirm_password: z.string()
    })
    .refine(data => data.new_password === data.confirm_password, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword']
    });

export type UpdatePasswordSchemaType = z.infer<typeof passwordSchema>;
