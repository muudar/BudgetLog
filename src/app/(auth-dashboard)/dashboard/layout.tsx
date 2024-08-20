import { Input } from '@/components/ui/input';
import { UserButton } from '@clerk/nextjs';
import { Search } from 'lucide-react';
import React from 'react';
import DesktopNav from './_components/DesktopNav';
import MobileNav from './_components/MobileNav';

//TODO: make current page highlighted in navbar
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <DesktopNav></DesktopNav>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <MobileNav></MobileNav>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <UserButton></UserButton>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default layout;
