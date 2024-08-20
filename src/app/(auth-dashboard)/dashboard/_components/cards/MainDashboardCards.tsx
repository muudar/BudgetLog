'use server';

import { auth } from '@clerk/nextjs/server';
import FinanceOverviewCard from './FinanceOverviewCard';
import BalanceModal from './modals/BalanceModal';
import prisma from '@/lib/db';
import SavingsModal from './modals/SavingsModal';
import EarningsModal from './modals/EarningsModal';
import { userData } from '@/lib/types';
import SpendingsModal from './modals/SpendingsModal';

const MainDashboardCards = async ({ userData }: { userData: userData }) => {
  return (
    <>
      <FinanceOverviewCard
        currency={userData?.currency}
        backgroundColor="bg-balanceBg"
        title={'Balance'}
        value={userData?.balance}
        modal={() => (
          <BalanceModal
            currentBalance={userData?.balance}
            currentSavings={userData?.savings}
          />
        )}
      ></FinanceOverviewCard>
      <FinanceOverviewCard
        currency={userData?.currency}
        backgroundColor="bg-savingsBg"
        title={'Savings'}
        value={userData?.savings}
        modal={() => (
          <SavingsModal
            currentBalance={userData?.balance}
            currentSavings={userData?.savings}
          ></SavingsModal>
        )}
      ></FinanceOverviewCard>
      <FinanceOverviewCard
        currency={userData?.currency}
        backgroundColor="bg-earningsBg"
        title={'Earnings'}
        value={userData?.earnings}
        modal={() => (
          <EarningsModal currentBalance={userData?.balance}></EarningsModal>
        )}
      ></FinanceOverviewCard>
      <FinanceOverviewCard
        currency={userData?.currency}
        backgroundColor="bg-spendingsBg"
        title={'Spendings'}
        value={userData?.spendings}
        modal={() => (
          <SpendingsModal currentBalance={userData?.balance}></SpendingsModal>
        )}
      ></FinanceOverviewCard>
    </>
  );
};

export default MainDashboardCards;
