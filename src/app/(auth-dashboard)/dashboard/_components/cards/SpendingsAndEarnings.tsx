import React from 'react';
import CategoryCardsGrouper from './CategoryCardsGrouper';
import {
  getTopEarningsCategories,
  getTopSpendingCategories,
} from '@/actions/transactions';

const SpendingsAndEarnings = async ({ currency }: { currency: string }) => {
  const spendingsRes = await getTopSpendingCategories();
  const earningsRes = await getTopEarningsCategories();
  if (!spendingsRes.ok || !earningsRes.ok) {
    return <div>Error fetching data</div>;
  }
  let spendingsData = spendingsRes.data;
  let earningsData = earningsRes.data;
  return (
    <>
      <CategoryCardsGrouper
        currency={currency}
        title="Spendings"
        backgroundColor="spendingsBg"
        data={spendingsData || []}
      ></CategoryCardsGrouper>
      <CategoryCardsGrouper
        currency={currency}
        title={'Earnings'}
        backgroundColor="earningsBg"
        data={earningsData || []}
      ></CategoryCardsGrouper>
    </>
  );
};

export default SpendingsAndEarnings;
