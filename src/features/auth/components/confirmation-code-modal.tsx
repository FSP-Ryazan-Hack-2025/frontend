'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    Input
} from '@/shared/ui';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { VerificationCodeType, verificationSchema } from '../schemes';

interface ConfirmationCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    verify: (code: string) => void;
}

export function ConfirmationCodeModal({
    isOpen,
    onClose,
    verify
}: ConfirmationCodeModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const form = useForm<VerificationCodeType>({
        resolver: zodResolver(verificationSchema),
        defaultValues: {
            code: ''
        }
    });

    const onSubmit = async (data: VerificationCodeType) => {
        try {
            setIsLoading(true);
            await verify(data.code);
            setIsSuccess(true);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Подтверждение регистрации</DialogTitle>
                    <DialogDescription>
                        Введите 6-значный код, отправленный на почту
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        {!isSuccess ? (
                            <>
                                <FormField
                                    control={form.control}
                                    name='code'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    maxLength={6}
                                                    inputMode='numeric'
                                                    pattern='[0-9]*'
                                                    className='text-center tracking-widest'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {errorMessage && (
                                    <div className='flex items-center justify-center gap-2 text-destructive'>
                                        <XCircle className='h-5 w-5' />
                                        <p className='text-sm'>
                                            {errorMessage}
                                        </p>
                                    </div>
                                )}

                                <div className='flex justify-between'>
                                    <Button
                                        type='button'
                                        variant='outline'
                                        onClick={() => form.reset()}
                                        disabled={isLoading}
                                    >
                                        Очистить
                                    </Button>
                                    <Button type='submit' disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                                Проверка...
                                            </>
                                        ) : (
                                            'Подтвердить'
                                        )}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className='flex flex-col items-center justify-center py-6'>
                                <CheckCircle className='mb-4 h-16 w-16 text-primary' />
                                <p className='text-center font-medium'>
                                    Код успешно подтвержден
                                </p>
                                <Button className='mt-4 w-full' disabled>
                                    Завершение регистрации...
                                </Button>
                            </div>
                        )}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
