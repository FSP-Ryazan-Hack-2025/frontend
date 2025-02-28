'use client';

import { LoginSchema, LoginSchemaType } from '../schemes';
import { AuthWrapper } from './auth-wrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input
} from '@/shared/ui';
import { useLogin } from '../hooks';

export function LoginForm() {
    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const { mutate, isPending } = useLogin();

    const onSubmit = (data: LoginSchemaType) => {
        mutate(data);
    };

    return (
        <AuthWrapper
            heading='Войти'
            description='Чтобы войти на сайт введите ваш email и пароль'
            backButtonLabel='Ещё нет аккаунта? Регистрация'
            backButtonLink='/sign-up'
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='flex flex-col gap-2 space-y-2'
                >
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Почта</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='ivan@example.com'
                                        type='email'
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='******'
                                        type='password'
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' disabled={isPending}>
                        {isPending ? 'Вход...' : 'Войти в аккаунт'}
                    </Button>
                </form>
            </Form>
        </AuthWrapper>
    );
}
