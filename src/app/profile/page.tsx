'use client';

import { EditAvatar } from '@/features/avatar/components';
import { Logout } from '@/features/logout/components';
import { ProfileTabs } from '@/features/user/components';
import { withAuth } from '@/shared/hoc';
import { useStore } from '@/shared/store';
import { Card } from '@/shared/ui';

function Profile() {
    const userData = useStore(state => state.userData);

    if (!userData) return null;

    return (
        <div className='container max-w-4xl py-10'>
            <h1 className='mb-6 text-3xl font-bold'>Настройки профиля</h1>

            <div className='mb-8 flex flex-col gap-6 md:flex-row'>
                <Card className='flex w-full flex-col items-center p-6 md:w-64'>
                    <EditAvatar userData={userData} />
                    <h2 className='text-xl font-semibold'>
                        {userData.name} {userData.surname}
                    </h2>
                    <p className='text-sm text-muted-foreground'>
                        {userData.email}
                    </p>

                    <Logout />
                </Card>

                <ProfileTabs />
            </div>
        </div>
    );
}

export default withAuth(Profile);
