import { getCurrentUserData } from '@/actions/actions';
import FinanceOverviewCard from './FinanceOverviewCard';

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
      <FinanceOverviewCard
        title={'Balance'}
        value={data?.balance}
        backgroundColor="#ECF5E7"
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
