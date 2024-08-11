import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '.././globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BudgetLog',
  description: 'Your best budget tracking app!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: 'green' },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-zinc-100 text-zinc-900`}>
          <Toaster></Toaster>
          <ClerkLoading>
            <div className="flex h-screen w-screen items-center justify-center text-2xl font-bold lg:text-4xl">
              Authorizing...
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <main>{children}</main>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
