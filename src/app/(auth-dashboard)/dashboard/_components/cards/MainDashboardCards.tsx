import { getCurrentUserData } from '@/actions/actions';
import BalanceCard from './BalanceCard';
import EarningsCard from './EarningsCard';
import SavingsCard from './SavingsCard';
import SpendingCard from './SpendingCard';

const MainDashboardCards = async () => {
  var data = null;
  try {
    data = await getCurrentUserData();
  } catch (err) {
    console.error(err);
  } finally {
    if (!data) return null;
  }
  return (
    <>
      <BalanceCard balance={data?.balance}></BalanceCard>
      <SavingsCard savings={data?.savings}></SavingsCard>
      <EarningsCard earnings={data?.earnings}></EarningsCard>
      <SpendingCard spendings={data?.spendings}></SpendingCard>
    </>
  );
};

export default MainDashboardCards;
