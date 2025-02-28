import Link from 'next/link';
import { type PropsWithChildren } from 'react';

import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/shared/ui';

interface AuthWrapperProps {
    heading: string;
    description?: string;
    backButtonLabel?: string;
    backButtonLink?: string;
}

export function AuthWrapper({
    children,
    heading,
    description,
    backButtonLabel,
    backButtonLink
}: PropsWithChildren<AuthWrapperProps>) {
    return (
        <Card className='mx-auto w-full max-w-[400px] shadow-md'>
            <CardHeader className='space-y-2 text-center'>
                <CardTitle className='text-2xl font-bold sm:text-3xl'>
                    {heading}
                </CardTitle>
                {description && (
                    <CardDescription className='text-sm sm:text-base'>
                        {description}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter className='flex justify-center'>
                {backButtonLabel && backButtonLink && (
                    <Button
                        variant='link'
                        className='w-full text-sm font-normal sm:text-base'
                    >
                        <Link href={backButtonLink}>{backButtonLabel}</Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
