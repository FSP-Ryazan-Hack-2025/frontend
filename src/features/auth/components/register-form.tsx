'use client';

import { RegisterSchema, RegisterSchemaType } from '../schemes';
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
    Input,
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue
} from '@/shared/ui';
import { useRegister } from '../hooks';

export function RegisterForm() {
    const form = useForm<RegisterSchemaType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            gender: 'male',
            password: '',
            passwordRepeat: ''
        }
    });

    const { mutate, isPending } = useRegister();

    const onSubmit = (data: RegisterSchemaType) => {
        mutate(data);
    };

    return (
        <AuthWrapper
            heading='Регистрация'
            description='Чтобы зарегистрироваться на сайте заполните поля ниже'
            backButtonLabel='Уже есть аккаунт? Войти'
            backButtonLink='/sign-in'
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='flex flex-col gap-2 space-y-2'
                >
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Имя</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Иван'
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
                        name='surname'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Фамилия</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Иванов'
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
                        name='gender'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Пол</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={isPending}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Выберите пол' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='male'>
                                            Мужской
                                        </SelectItem>
                                        <SelectItem value='female'>
                                            Женский
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
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
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='passwordRepeat'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Повторите пароль</FormLabel>
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
                        {isPending ? 'Создание...' : 'Создать аккаунт'}
                    </Button>
                </form>
            </Form>
        </AuthWrapper>
    );
}
