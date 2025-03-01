'use client';

import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { ProfileForm } from './profile-form';
import { PasswordForm } from './password-form';

export function ProfileTabs() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex-1'
        >
            <Tabs defaultValue='profile' className='w-full'>
                <TabsList className='grid w-full grid-cols-2'>
                    <TabsTrigger value='profile'>
                        Информация профиля
                    </TabsTrigger>
                    <TabsTrigger value='password'>Пароль</TabsTrigger>
                </TabsList>

                <TabsContent value='profile'>
                    <ProfileForm />
                </TabsContent>

                <TabsContent value='password'>
                    <PasswordForm />
                </TabsContent>
            </Tabs>
        </motion.div>
    );
}
