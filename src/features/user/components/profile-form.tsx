import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateProfile } from '../hooks';
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage
} from '@/shared/ui';
import {
    Button,
    Input,
    Label,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from '@/shared/ui';
import { profileSchema, UpdateProfileSchemaType } from '../schemes';

export function ProfileForm() {
    const form = useForm<UpdateProfileSchemaType>({
        resolver: zodResolver(profileSchema),
        defaultValues: { name: '', surname: '', patronymic: '' }
    });
    const { mutate, isPending } = useUpdateProfile();

    const onSubmit = (data: UpdateProfileSchemaType) => {
        mutate(data);
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Информация профиля</CardTitle>
                    </CardHeader>
                    <CardContent className='grid grid-cols-2 gap-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Имя</Label>
                                    <FormControl>
                                        <Input {...field} />
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
                                    <Label>Фамилия</Label>
                                    <FormControl>
                                        <Input {...field} />
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
                                    <Label>Отчество</Label>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type='submit' disabled={isPending}>
                            Сохранить
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
