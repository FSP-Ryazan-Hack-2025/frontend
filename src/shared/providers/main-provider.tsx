'use client';

import { type PropsWithChildren } from 'react';
import { TanstackQueryProvider } from './tanstack-query-provider';
import { ThemeProvider } from './theme-provider';
import { ToastProvider } from './toast-provider';

export function MainProvider({ children }: PropsWithChildren<unknown>) {
    return (
        <TanstackQueryProvider>
            <ThemeProvider
                attribute='class'
                defaultTheme='light'
                disableTransitionOnChange
                storageKey='test-theme'
            >
                <ToastProvider />
                {children}
            </ThemeProvider>
        </TanstackQueryProvider>
    );
}
