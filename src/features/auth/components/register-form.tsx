'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, type RegisterSchemaType } from '../schemes';
import { AuthWrapper } from './auth-wrapper';
import { useRegister } from '../hooks';
import { ConfirmationCodeModal } from './confirmation-code-modal';
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
import axios from 'axios';

export function RegisterForm() {
    const [role, setRole] = useState<
        'buyer' | 'individual' | 'selfEmployed' | 'company'
    >('buyer');

    const [isVerificationModalOpen, setIsVerificationModalOpen] =
        useState(false);
    const [formData, setFormData] = useState<RegisterSchemaType | null>(null);
    const [isRequestingCode, setIsRequestingCode] = useState(false);

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
                      name: '',
                      surname: '',
                      patronymic: '',
                      passport_series: '',
                      passport_number: '',
                      birthday_date: '',
                      password: '',
                      passwordRepeat: ''
                  }
    });

    const { mutate, isPending } = useRegister();

    const requestVerificationCode = useCallback(async (email: string) => {
        setIsRequestingCode(true);
        try {
            await api.get(`/user/register/verify_code?email=${email}`);
            return true;
        } catch (error) {
            console.error('Error requesting verification code:', error);
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                throw error;
            }
            toast.error('Ошибка запроса кода. Попробуйте снова.');
            return false;
        } finally {
            setIsRequestingCode(false);
        }
    }, []);

    const onSubmit = async (data: RegisterSchemaType) => {
        if (data.role === 'buyer') {
            setFormData(data);
            try {
                const success = await requestVerificationCode(data.email);
                if (success) {
                    setIsVerificationModalOpen(true);
                }
            } catch (error) {
                if (
                    axios.isAxiosError(error) &&
                    error.response?.status === 409
                ) {
                    toast.error('Пользователь с таким email уже существует');
                    form.setError('email', {
                        type: 'manual',
                        message: 'Пользователь с таким email уже существует'
                    });
                } else {
                    toast.error('Ошибка при регистрации. Попробуйте снова.');
                }
            }
        } else {
            try {
                const obj = Object.fromEntries(
                    Object.entries(data).filter(
                        ([key]) => key !== 'passwordRepeat'
                    )
                ) as Omit<RegisterSchemaType, 'passwordRepeat'>;


                mutate({ data: obj, path: 'seller' });
            } catch (error) {
                if (
                    axios.isAxiosError(error) &&
                    error.response?.status === 409
                ) {
                    toast.error('Пользователь с такими данными уже существует');
                    if (data.inn) {
                        form.setError('inn', {
                            type: 'manual',
                            message: 'ИНН уже зарегистрирован в системе'
                        });
                    }
                } else {
                    console.error('Error registering seller:', error);
                    toast.error('Ошибка при регистрации. Попробуйте снова.');
                }
            }
        }
    };

    const handleVerifyData = async (code: string) => {
        if (!formData) {
            toast.error('Данные формы не найдены');
            return;
        }

        try {
            const typedDataBuyer = formData as {
                role: 'buyer';
                name: string;
                surname: string;
                patronymic: string;
                email: string;
                password: string;
                passwordRepeat: string;
            };

            const response = await api.post(
                `/user/register/verify_code?email=${typedDataBuyer.email}&code=${code}`
            );

            if (response.status === 200) {
                const obj = Object.fromEntries(
                    Object.entries(typedDataBuyer).filter(
                        ([key]) => key !== 'passwordRepeat'
                    )
                ) as Omit<RegisterSchemaType, 'passwordRepeat'>;

                setIsVerificationModalOpen(false);
                await mutate({ data: obj, path: 'user' });
            }
        } catch (error) {
            console.error('Error verifying code:', error);
            throw error;
        }
    };

    const handleResendCode = async () => {
        if (!formData || formData.role !== 'buyer') {
            toast.error('Данные формы не найдены');
            return;
        }

        await requestVerificationCode(formData.email);
        toast.success('Код отправлен повторно');
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
                                                      name: '',
                                                      surname: '',
                                                      patronymic: '',
                                                      inn: '',
                                                      passport_series: '',
                                                      passport_number: '',
                                                      birthday_date: '',
                                                      password: '',
                                                      passwordRepeat: ''
                                                  }
                                        );
                                    }}
                                    defaultValue={field.value}
                                    disabled={isPending || isRequestingCode}
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

                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Имя</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Иван'
                                        {...field}
                                        disabled={isPending || isRequestingCode}
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
                                        {...field}
                                        disabled={isPending || isRequestingCode}
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
                                        {...field}
                                        disabled={isPending || isRequestingCode}
                                    />
                                </FormControl>
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
                                    <FormLabel>Электронная почта</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='ivan@mail.ru'
                                            type='email'
                                            {...field}
                                            disabled={
                                                isPending || isRequestingCode
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ) : (
                        <>
                            <FormField
                                control={form.control}
                                name='inn'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ИНН</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Введите ИНН (10 или 12 цифр)'
                                                {...field}
                                                disabled={
                                                    isPending ||
                                                    isRequestingCode
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='passport_series'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Серия</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='0000'
                                                {...field}
                                                disabled={
                                                    isPending ||
                                                    isRequestingCode
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='passport_number'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Номер</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='000000'
                                                {...field}
                                                disabled={
                                                    isPending ||
                                                    isRequestingCode
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='birthday_date'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Дата рождения</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='date'
                                                {...field}
                                                disabled={
                                                    isPending ||
                                                    isRequestingCode
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
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
                                        disabled={isPending || isRequestingCode}
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
                                        disabled={isPending || isRequestingCode}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {formData && (
                        <ConfirmationCodeModal
                            isOpen={isVerificationModalOpen}
                            onClose={() => setIsVerificationModalOpen(false)}
                            verify={handleVerifyData}
                            email={
                                formData.role === 'buyer' ? formData.email : ''
                            }
                            onResendCode={handleResendCode}
                        />
                    )}

                    <Button
                        type='submit'
                        disabled={isPending || isRequestingCode}
                    >
                        {isPending || isRequestingCode
                            ? 'Обработка...'
                            : 'Создать аккаунт'}
                    </Button>
                </form>
            </Form>
        </AuthWrapper>
    );
}