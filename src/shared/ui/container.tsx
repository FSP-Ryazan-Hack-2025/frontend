export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className='mx-auto flex min-h-screen max-w-6xl flex-col p-4'>
            {children}
        </div>
    );
}
