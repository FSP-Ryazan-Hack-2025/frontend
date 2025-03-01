import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema } from '../schemes';
import { useUpdatePassword } from '../hooks/use-update-password';
import {
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    Input,
    Label
} from '@/shared/ui';
import { UpdatePasswordSchemaType } from '../schemes';

export function PasswordForm() {
    const form = useForm<UpdatePasswordSchemaType>({
        resolver: zodResolver(passwordSchema),
        defaultValues: { new_password: '', confirm_password: '' }
    });
    const { mutate, isPending } = useUpdatePassword();

    const onSubmit = (data: UpdatePasswordSchemaType) => {
        mutate(data.new_password);
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Изменить пароль</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name='new_password'
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Новый пароль</Label>
                                    <FormControl>
                                        <Input
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
                            name='confirm_password'
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Подтвердите пароль</Label>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            disabled={isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type='submit' disabled={isPending}>
                            Обновить пароль
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
