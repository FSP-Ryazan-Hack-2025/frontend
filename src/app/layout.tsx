import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/shared/styles/globals.css';
import { MainProvider } from '@/shared/providers';
import { Container } from '@/shared/ui';
import { Header } from '@/widgets/header';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
    title: '',
    description: ''
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='ru' suppressHydrationWarning>
            <body className={`${inter.className} antialiased`}>
                <MainProvider>
                    <Container>
                        <Header />
                        <main className='flex-1'>{children}</main>
                    </Container>
                </MainProvider>
            </body>
        </html>
    );
}
