import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Button } from '@/components/ui/button';

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
        variables: { colorPrimary: 'red' },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-zinc-100 text-zinc-900`}>
          <ClerkLoading>
            <div>Loading</div>
          </ClerkLoading>
          <ClerkLoaded>
            <main>{children}</main>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
