import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
    title: 'Threads',
    description: 'A Next.js 14 Threads Application',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ClerkProvider></ClerkProvider>;
}
