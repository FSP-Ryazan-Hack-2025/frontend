import { z } from 'zod';

const buyerSchema = z.object({
    role: z.literal('buyer'),
    name: z.string().min(1, { message: 'Введите имя' }),
    surname: z.string().min(1, { message: 'Введите фамилию' }),
    patronymic: z.string().min(1, { message: 'Введите отчество' }),
    email: z.string().email({ message: 'Некорректный email' }),
    password: z.string().min(6, { message: 'Пароль минимум 6 символов' }),
    passwordRepeat: z.string()
});

const businessSchema = z.object({
    role: z.enum(['individual', 'selfEmployed', 'company'], {
        message: 'Выберите корректный тип регистрации'
    }),
    inn: z.string().regex(/^\d{10,12}$/, {
        message: 'Введите корректный ИНН (10 или 12 цифр)'
    }),
    password: z.string().min(6, { message: 'Пароль минимум 6 символов' }),
    passwordRepeat: z.string()
});

export const RegisterSchema = z
    .discriminatedUnion('role', [buyerSchema, businessSchema])
    .refine(data => data.password === data.passwordRepeat, {
        message: 'Пароли не совпадают',
        path: ['passwordRepeat']
    });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
