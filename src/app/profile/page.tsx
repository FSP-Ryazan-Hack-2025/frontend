'use client';

import { withAuth } from '@/shared/hoc';
import { useStore } from '@/shared/store';
import Link from 'next/link';

function Profile() {
    const userData = useStore(state => state.userData);
    return (
        <div>
            <h1 className='text-4xl font-bold mb-4'>Профиль</h1>
            <Link href='/'>На главную</Link>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
    );
}

export default withAuth(Profile);
