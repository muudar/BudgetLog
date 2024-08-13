'use server';

import { auth } from '@clerk/nextjs/server';
import FinanceOverviewCard from './FinanceOverviewCard';
import BalanceModal from './modals/BalanceModal';
import prisma from '@/lib/db';
import SavingsModal from './modals/SavingsModal';
import EarningsModal from './modals/EarningsModal';

//TODO: create type for userData
type userData = any;

const MainDashboardCards = async () => {
  const userId: string | null = auth().userId;
  if (!userId) return null;
  const data: userData = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
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
          <EarningsModal
            currentBalance={data?.balance}
            currentSavings={data?.savings}
          ></EarningsModal>
        )}
      ></FinanceOverviewCard>
      <FinanceOverviewCard
        backgroundColor="#f6d5d4"
        title={'Spendings'}
        value={data?.spendings}
      ></FinanceOverviewCard>
    </>
  );
};

export default MainDashboardCards;
