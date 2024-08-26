import React from 'react';

type Props = {
  categoryName: string;
  emoji: string;
  backgroundColor: string;
  value: number;
  currency: string;
};

const CategoryCard = ({
  backgroundColor,
  value,
  emoji,
  categoryName,
  currency,
}: Props) => {
  return (
    <div
      className={`flex-col break-words rounded-md text-sm bg-${backgroundColor} p-2`}
    >
      <div className="text-lg">{emoji}</div>
      <div className="w-full truncate">{categoryName}</div>
      <div className="hidden font-bold sm:block">
        {value} {currency}
      </div>
      <div className="block sm:hidden">
        <div className="font-bold">{value}</div>
        <div className="font-bold">{currency}</div>
      </div>
    </div>
  );
};

export default CategoryCard;
