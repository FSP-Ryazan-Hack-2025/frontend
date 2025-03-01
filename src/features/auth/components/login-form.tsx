'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginSchemaType } from '../schemes';
import { AuthWrapper } from './auth-wrapper';
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue
} from '@/shared/ui';
import { useState } from 'react';
import { useLogin } from '../hooks';

export function LoginForm() {
    const [role, setRole] = useState<
        'buyer' | 'individual' | 'selfEmployed' | 'company'
    >('buyer');

    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            role: 'buyer',
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
            heading='Вход'
            description='Введите данные для входа'
            backButtonLabel='Нет аккаунта? Зарегистрироваться'
            backButtonLink='/sign-up'
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='flex flex-col gap-2 space-y-2'
                >
                    <FormField
                        control={form.control}
                        name='role'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Тип аккаунта</FormLabel>
                                <Select
                                    onValueChange={value => {
                                        const typedValue = value as
                                            | 'buyer'
                                            | 'individual'
                                            | 'selfEmployed'
                                            | 'company';
                                        field.onChange(typedValue);
                                        setRole(typedValue);
                                        form.reset(
                                            typedValue === 'buyer'
                                                ? {
                                                      role: 'buyer',
                                                      email: '',
                                                      password: ''
                                                  }
                                                : {
                                                      role: typedValue,
                                                      inn: '',
                                                      password: ''
                                                  }
                                        );
                                    }}
                                    defaultValue={field.value}
                                    disabled={isPending}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Выберите тип аккаунта' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='buyer'>
                                            Покупатель
                                        </SelectItem>
                                        <SelectItem value='individual'>
                                            ИП
                                        </SelectItem>
                                        <SelectItem value='selfEmployed'>
                                            Самозанятый
                                        </SelectItem>
                                        <SelectItem value='company'>
                                            ООО
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {role === 'buyer' ? (
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
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
                    ) : (
                        <FormField
                            control={form.control}
                            name='inn'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ИНН</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Введите ИНН'
                                            disabled={isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

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
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' disabled={isPending}>
                        {isPending ? 'Вход...' : 'Войти'}
                    </Button>
                </form>
            </Form>
        </AuthWrapper>
    );
}
