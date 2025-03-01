import { z } from 'zod';

const buyerSchema = z.object({
    role: z.literal('buyer'),
    email: z.string().email({ message: 'Некорректный email' }),
    password: z.string().min(6, { message: 'Пароль минимум 6 символов' })
});

const businessSchema = z.object({
    role: z.enum(['individual', 'selfEmployed', 'company'], {
        message: 'Выберите корректный тип авторизации'
    }),
    inn: z.string().regex(/^\d{10,12}$/, {
        message: 'Введите корректный ИНН (10 или 12 цифр)'
    }),
    password: z.string().min(6, { message: 'Пароль минимум 6 символов' })
});

export const LoginSchema = z.discriminatedUnion('role', [
    buyerSchema,
    businessSchema
]);

export type LoginSchemaType = z.infer<typeof LoginSchema>;
