'use server';

import { auth } from '@clerk/nextjs/server';
import FinanceOverviewCard from './FinanceOverviewCard';
import BalanceModal from './modals/BalanceModal';
import prisma from '@/lib/db';
import SavingsModal from './modals/SavingsModal';
import EarningsModal from './modals/EarningsModal';
import { userData } from '@/lib/types';
import SpendingsModal from './modals/SpendingsModal';

const MainDashboardCards = async () => {
  const userId: string | null = auth().userId;
  if (!userId) return null;
  const data: userData | null = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!data) return null;
  return (
    <>
      <FinanceOverviewCard
        backgroundColor="#ECF5E7"
        title={'Balance'}
        value={data?.balance}
        modal={() => (
          <BalanceModal
            currentBalance={data?.balance}
            currentSavings={data?.savings}
          />
        )}
      ></FinanceOverviewCard>
      <FinanceOverviewCard
        backgroundColor="#EBEFFE"
        title={'Savings'}
        value={data?.savings}
        modal={() => (
          <SavingsModal
            currentBalance={data?.balance}
            currentSavings={data?.savings}
          ></SavingsModal>
        )}
      ></FinanceOverviewCard>
      <FinanceOverviewCard
        backgroundColor="#ECF5F4"
        title={'Earnings'}
        value={data?.earnings}
        modal={() => (
          <EarningsModal currentBalance={data?.balance}></EarningsModal>
        )}
      ></FinanceOverviewCard>
      <FinanceOverviewCard
        backgroundColor="#f6d5d4"
        title={'Spendings'}
        value={data?.spendings}
        modal={() => (
          <SpendingsModal currentBalance={data?.balance}></SpendingsModal>
        )}
      ></FinanceOverviewCard>
    </>
  );
};

export default MainDashboardCards;
