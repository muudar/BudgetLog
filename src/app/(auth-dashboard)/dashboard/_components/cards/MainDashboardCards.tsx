'use server';

import { auth } from '@clerk/nextjs/server';
import FinanceOverviewCard from './FinanceOverviewCard';
import AddBalanceModal from './modals/AddBalanceModal';
import prisma from '@/lib/db';

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
        title={'Balance'}
        value={data?.balance}
        backgroundColor="#ECF5E7"
        modal={() => (
          <AddBalanceModal
            currentBalance={data?.balance}
            currentSavings={data?.savings}
          />
        )}
      ></FinanceOverviewCard>
      <FinanceOverviewCard
        title={'Savings'}
        value={data?.savings}
        backgroundColor="#EBEFFE"
      ></FinanceOverviewCard>
      <FinanceOverviewCard
        title={'Earnings'}
        value={data?.earnings}
        backgroundColor="#ECF5F4"
      ></FinanceOverviewCard>
      <FinanceOverviewCard
        title={'Spendings'}
        value={data?.spendings}
        backgroundColor="#f6d5d4"
      ></FinanceOverviewCard>
    </>
  );
};

export default MainDashboardCards;
