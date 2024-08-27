import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BarChart,
  CheckCircle,
  MonitorSmartphone,
  TrendingUp,
} from 'lucide-react';
import Image from 'next/image';
import WhyUsCard from './_components/WhyUsCard';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-muted/60 px-6 py-10 sm:px-12">
      <nav className="flex w-full items-center justify-between">
        <div className="-mt-3 hidden sm:block">
          <Image
            src={'/logos/horizontal-logo.png'}
            alt="Logo"
            height={0}
            width={0}
            sizes="100vw"
            style={{ width: '150px', height: 'auto' }}
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
      <main className="mt-[50px] flex w-full flex-col flex-wrap justify-between gap-12 lg:flex-row">
        <section className="flex flex-col gap-12 lg:flex-row">
          <section className="flex flex-col items-center gap-4 self-center text-center lg:w-full lg:items-start lg:px-0 lg:text-left">
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
          </section>
          <div>
            <Image
              src="/devices.png"
              width={0}
              height={0}
              sizes="100vw"
              priority
              style={{ width: '100%', height: 'auto' }}
              alt="Image of device mockup"
            />
          </div>
        </section>
        <section className="flex w-full flex-col items-center justify-center gap-12 text-sm">
          <div className="text-4xl font-bold">Why Choose Us?</div>
          <div className="grid grid-cols-1 grid-rows-4 gap-6 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1">
            <WhyUsCard
              title="Track Transactions"
              description="Log all transactions and categorize them to clearly see where your money is coming and going."
              Icon={TrendingUp}
            />
            <WhyUsCard
              title="Detailed Insight"
              description="Analyze your spending and earnings patterns to make informed financial decisions."
              Icon={BarChart}
            />
            <WhyUsCard
              title="Easy to Use"
              description="Navigate the app effortlessly with an intuitive user interface designed for simplicity."
              Icon={CheckCircle}
            />
            <WhyUsCard
              title="Responsive Design"
              description="Enjoy a seamless experience across all devices, with a design optimized for every screen."
              Icon={MonitorSmartphone}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
