'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, type RegisterSchemaType } from '../schemes';
import { AuthWrapper } from './auth-wrapper';
import { useRegister } from '../hooks';
import { ConfirmationCodeModal } from './input-modal';
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
import { api } from '@/shared/api';
import { toast } from 'sonner';

export function RegisterForm() {
    const [role, setRole] = useState<
        'buyer' | 'individual' | 'selfEmployed' | 'company'
    >('buyer');

    const [isVerificationModalOpen, setIsVerificationModalOpen] =
        useState(false);
    const [formData, setFormData] = useState<RegisterSchemaType | null>(null);

    const form = useForm<RegisterSchemaType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues:
            role === 'buyer'
                ? {
                      role: 'buyer',
                      name: '',
                      surname: '',
                      patronymic: '',
                      email: '',
                      password: '',
                      passwordRepeat: ''
                  }
                : {
                      role: role,
                      inn: '',
                      password: '',
                      passwordRepeat: ''
                  }
    });

    const { mutate, isPending } = useRegister();

    const onSubmit = async (data: RegisterSchemaType) => {
        if (data.role === 'buyer') {
            setFormData(data);

            try {
                await api.get(`/user/register/verify_code?email=${data.email}`);
                setIsVerificationModalOpen(true);
            } catch (error) {
                console.log(error);
                setIsVerificationModalOpen(false);
                toast.error('Ошибка запроса кода. Попробуйте снова.');
                form.reset();
            }
        } else {
            try {
                const obj = Object.fromEntries(
                    Object.entries(data).filter(
                        ([key]) => key !== 'passwordRepeat'
                    )
                ) as Omit<RegisterSchemaType, 'passwordRepeat'>;
                mutate(obj);
            } catch (error) {
                console.log(error);
                setIsVerificationModalOpen(false);
                form.reset();
            }
        }
    };

    const handleVerifyData = async (code: string) => {
        if (!formData) return false;

        try {
            const typedData = formData as {
                role: 'buyer';
                name: string;
                surname: string;
                patronymic: string;
                email: string;
                password: string;
                passwordRepeat: string;
            };
            const response = await api.post(
                `/user/register/verify_code?email=${typedData.email}&code=${code}`
            );

            if (response.status === 200) {
                const obj = Object.fromEntries(
                    Object.entries(typedData).filter(
                        ([key]) => key !== 'passwordRepeat'
                    )
                ) as Omit<RegisterSchemaType, 'passwordRepeat'>;
                mutate(obj);
            }
        } catch (error) {
            console.log(error);
            setIsVerificationModalOpen(false);
            toast.error('Ошибка подтверждения. Попробуйте снова.');
            form.reset();
        }
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
                        name='role'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Тип регистрации</FormLabel>
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
                                                      name: '',
                                                      surname: '',
                                                      patronymic: '',
                                                      email: '',
                                                      password: '',
                                                      passwordRepeat: ''
                                                  }
                                                : {
                                                      role: typedValue,
                                                      inn: '',
                                                      password: '',
                                                      passwordRepeat: ''
                                                  }
                                        );
                                    }}
                                    defaultValue={field.value}
                                    disabled={isPending}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Выберите тип' />
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
                                            ЮрЛицо
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {role === 'buyer' && (
                        <>
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
                                name='patronymic'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Отчество</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Иванович'
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
                        </>
                    )}

                    {role !== 'buyer' && (
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
                        name='passwordRepeat'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Повторите пароль</FormLabel>
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

                    <ConfirmationCodeModal
                        isOpen={isVerificationModalOpen}
                        onClose={() => setIsVerificationModalOpen(false)}
                        verify={handleVerifyData}
                    />

                    <Button type='submit' disabled={isPending}>
                        {isPending ? 'Создание...' : 'Создать аккаунт'}
                    </Button>
                </form>
            </Form>
        </AuthWrapper>
    );
}
