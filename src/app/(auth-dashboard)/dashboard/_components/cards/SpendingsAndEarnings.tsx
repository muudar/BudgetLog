import React from 'react';
import CategoryCardsGrouper from './CategoryCardsGrouper';

const SpendingsAndEarnings = () => {
  return (
    <>
      <CategoryCardsGrouper
        title="Spendings"
        backgroundColor="spendingsBg"
      ></CategoryCardsGrouper>
      <CategoryCardsGrouper
        title={'Earnings'}
        backgroundColor="earningsBg"
      ></CategoryCardsGrouper>
    </>
  );
};

export default SpendingsAndEarnings;
