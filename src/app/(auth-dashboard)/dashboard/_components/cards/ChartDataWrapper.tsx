import { getLast7DaysTransactions } from '@/actions/transactions';
import React from 'react';
import HomeSpendingChart from './HomeSpendingChart';

const ChartDataWrapper = async () => {
  const res = await getLast7DaysTransactions();
  if (!res.ok) {
    return null;
  }
  const data = res.data;
  console.log(data);
  return <HomeSpendingChart data={data || []}></HomeSpendingChart>;
};

export default ChartDataWrapper;
