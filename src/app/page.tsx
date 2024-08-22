import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-muted/60 px-12 py-10">
      <nav className="flex w-full items-center justify-between">
        <div className="text-xl font-bold">BudgetLog</div>
        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-8 sm:flex">
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
        <div className="flex flex-col gap-4">
          <div className="text-5xl xl:text-7xl">
            Simple way to manage your money
          </div>
          <div className="text-slate-500">
            Log your spendings and earnings now!
          </div>
          <a href="/sign-up">
            <Button className="w-[150px] gap-2 bg-black hover:bg-slate-600">
              Get Started <ArrowRight />
            </Button>
          </a>
        </div>
        <Image
          src="/devices.png"
          width={800}
          height={700}
          alt="Image of device mockup"
        />
      </main>
    </div>
  );
}
