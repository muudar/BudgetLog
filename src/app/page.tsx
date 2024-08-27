import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-muted/60 px-6 py-10 sm:px-12">
      <nav className="flex w-full items-center justify-between">
        <div className="-mt-3 hidden sm:block">
          <Image
            src={'/logos/horizontal-logo.png'}
            alt="Logo"
            height={0}
            width={150}
          ></Image>
        </div>
        <div className="block sm:hidden">
          <Image
            src={'/logos/mobile-logo.png'}
            alt="Logo"
            height={50}
            width={50}
          ></Image>
        </div>
        {/* <div className="text-xl font-bold">BudgetLog</div> */}
        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-8 md:flex">
            <div className="cursor-pointer">Features</div>
            <div className="cursor-pointer">Why BudgetLog?</div>
            <div className="cursor-pointer">Pricing</div>
          </div>
          <a href="/login">
            <Button className="ml-8 bg-black px-6 hover:bg-slate-600">
              Login
            </Button>
          </a>
        </div>
      </nav>
      <main className="mt-[50px] flex w-full flex-col justify-between gap-12 lg:flex-row">
        <div className="flex w-screen flex-col items-center gap-4 self-center px-8 text-center lg:w-full lg:items-start lg:px-0 lg:text-left">
          <div className="text-5xl xl:text-7xl">
            Simple way to manage your money
          </div>
          <div className="text-slate-500">
            Log your spendings and earnings now!
          </div>
          <a href="/sign-up" className="w-[150px]">
            <Button className="w-[150px] gap-2 bg-black hover:bg-slate-600">
              Get Started <ArrowRight />
            </Button>
          </a>
        </div>
        <div>
          <Image
            src="/devices.png"
            layout="responsive"
            width={600}
            height={0}
            alt="Image of device mockup"
          />
        </div>
      </main>
    </div>
  );
}
